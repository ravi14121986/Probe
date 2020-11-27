import pandas as pd
import pymysql
import teradata
import pyodbc
import sys
import matplotlib.pyplot as plt
import glob

link = 'DRIVER={DRIVERNAME};DBCNAME={hostname};UID={uid};PWD={pwd}'\
    .format(DRIVERNAME='Teradata Database ODBC Driver 17.00',
            hostname='10.58.0.66',
            uid='td_user25',
            Database='TD_BIM_FR_TRNG_DB',
            pwd='td_user25')

conn = pyodbc.connect(link)

query1_schemasize = "SELECT 'What are the sizes of the schemas (GB)?' " \
        "AS KPI_DESCRIPTION,'SIZE_OF_SCHEMA' AS QUALIFIER," \
        "'MAX_SIZE-'||TRIM(MAX_PERM)||'0A'XC||'CURRENT_PERM_SIZE-'||TRIM(CURRENT_PERM)||'0A'XC||'MAX_SPOOL_SIZE-'||TRIM(MAX_SPOOL) " \
        "||'0A'XC||'CURRENT_SPOOL_SIZE-'||TRIM(CURRENT_SPOOL) " \
        "AS KPI_VALUE FROM (SELECT DATABASENAME,CAST(SUM(MAXPERM)/(1024*1024*1024) AS DECIMAL(7,2)) MAX_PERM, " \
        "CAST(SUM(CURRENTPERM)/(1024*1024*1024) AS DECIMAL(7,2)) CURRENT_PERM, " \
        "CAST(SUM(MAXSPOOL)/(1024*1024*1024) AS DECIMAL(7,2)) MAX_SPOOL, " \
        "CAST(SUM(CURRENTSPOOL)/(1024*1024*1024) AS DECIMAL(7,2)) CURRENT_SPOOL " \
        "FROM " \
        "DBC.DISKSPACE " \
        "WHERE DATABASENAME = 'TD_BIM_FR_TRNG_DB' " \
        "GROUP BY DATABASENAME " \
        ") SIZE " \
        "GROUP BY 1,2,3 " \
        ";"

df1 = pd.read_sql(query1_schemasize, conn)
print(df1)
df1.to_csv('Kpi1_schemasize.csv')

query2_tablesize = "SELECT " \
                   "'What is the size of the tables being considered (GB)?' AS KPI_DESCRIPTION " \
                   ",'TABLE_SIZE' AS QUALIFIER " \
                   ",SUM(CURRENT_PERM) AS KPI_VALUE " \
                   "FROM " \
                   "( " \
                   "SELECT  " \
                   "DATABASENAME,  " \
                   "TABLENAME ,  " \
                   "CAST(SUM(CURRENTPERM)/(1024*1024*1024) AS DECIMAL(7,2)) CURRENT_PERM " \
                   "FROM DBC.TABLESIZE   " \
                   "WHERE DATABASENAME= 'TD_BIM_FR_TRNG_DB' " \
                   "GROUP BY 1,2 " \
                   ") SIZE " \
                   "GROUP BY 1,2 " \
                   ";"

df = pd.read_sql(query2_tablesize, conn)
print(df)
df.to_csv('Kpi2_tablesize.csv')

query3_Largest_Table_Size = "SELECT " \
                            "'What is the size of the largest table (GB)?' AS KPI_DESCRIPTION " \
                            ",'LARGEST_TABLE_SIZE' AS QUALIFIER " \
                            ",CURRENT_PERM AS KPI_VALUE " \
                            "FROM " \
                            "( " \
                            "SELECT  " \
                            "DATABASENAME,  " \
                            "TABLENAME ,  " \
                            "CAST(SUM(CURRENTPERM)/(1024*1024*1024) AS DECIMAL(7,2)) CURRENT_PERM " \
                            "FROM DBC.TABLESIZE   " \
                            "WHERE DATABASENAME= 'TD_BIM_FR_TRNG_DB' " \
                            "GROUP BY 1,2 " \
                            "QUALIFY ROW_NUMBER () OVER (PARTITION BY DATABASENAME ORDER BY CURRENT_PERM DESC)=1 " \
                            ") SIZE " \
                            "GROUP BY 1,2,3 " \
                            "; " \
                            ""
df = pd.read_sql(query3_Largest_Table_Size, conn)
print(df)
df.to_csv('Kpi3_largest_table_size.csv')

query4_avg_tablesize = "SELECT " \
                       "'What is the average table size (MB)?' AS KPI_DESCRIPTION " \
                       ",'AVERAGE_TABLE_SIZE' AS QUALIFIER " \
                       ",CAST((AVG_SIZE)/(1024*1024) AS DECIMAL(7,2)) AS KPI_VALUE " \
                       "FROM " \
                       "( " \
                       "SELECT  " \
                       "DATABASENAME,  " \
                       "SUM(CURRENTPERM) CURRENT_PERM, " \
                       "COUNT(DISTINCT TABLENAME) CNT1, " \
                       "(CURRENT_PERM/CNT1) AVG_SIZE " \
                       "FROM DBC.TABLESIZE   " \
                       "WHERE DATABASENAME= 'TD_BIM_FR_TRNG_DB' " \
                       "GROUP BY 1 " \
                       ") SIZE " \
                       "GROUP BY 1,2,3 " \
                       "; " \
                       ""

df = pd.read_sql(query4_avg_tablesize, conn)
print(df)
df.to_csv('Kpi4_avg_tablesize.csv')

query4a_typeofobjects = "SELECT " \
                        "'What are the types and number of objects?' AS KPI_DESCRIPTION " \
                        ",'TYPE_AND_NUMBER_OF_OBJECTS' AS QUALIFIER " \
                        ",TRIM(OBJECT_TYPE||'-'||TRIM(NUMBER_OF_OBJECTS)) AS KPI_VALUE " \
                        "FROM " \
                        "( " \
                        "SELECT  " \
                        "CASE  " \
                        "WHEN TABLEKIND= 'A' THEN 'AGGREGATE FUNCTION' " \
                        "WHEN TABLEKIND= 'B' THEN 'COMBINED AGGREGATE AND ORDERED ANALYTICAL FUNCTION' " \
                        "WHEN TABLEKIND= 'C' THEN 'TABLE OPERATOR PARSER CONTRACT FUNCTION' " \
                        "WHEN TABLEKIND= 'D' THEN 'JAR' " \
                        "WHEN TABLEKIND= 'E' THEN 'EXTERNAL STORED PROCEDURE' " \
                        "WHEN TABLEKIND= 'F' THEN 'STANDARD FUNCTION' " \
                        "WHEN TABLEKIND= 'G' THEN 'TRIGGER' " \
                        "WHEN TABLEKIND= 'H' THEN 'INSTANCE OR CONSTRUCTOR METHOD' " \
                        "WHEN TABLEKIND= 'I' THEN 'JOIN INDEX' " \
                        "WHEN TABLEKIND= 'J' THEN 'JOURNAL' " \
                        "WHEN TABLEKIND= 'K' THEN 'FOREIGN SERVER OBJECT' " \
                        "WHEN TABLEKIND= 'L' THEN 'USER-DEFINED TABLE OPERATOR' " \
                        "WHEN TABLEKIND= 'M' THEN 'MACRO' " \
                        "WHEN TABLEKIND= 'N' THEN 'HASH INDEX' " \
                        "WHEN TABLEKIND= 'O' THEN 'TABLE WITH NO PRIMARY INDEX AND NO PARTITIONING' " \
                        "WHEN TABLEKIND= 'P' THEN 'STORED PROCEDURE' " \
                        "WHEN TABLEKIND= 'Q' THEN 'QUEUE TABLE' " \
                        "WHEN TABLEKIND= 'R' THEN 'TABLE FUNCTION' " \
                        "WHEN TABLEKIND= 'S' THEN 'ORDERED ANALYTICAL FUNCTION' " \
                        "WHEN TABLEKIND= 'T' THEN 'TABLE WITH A PRIMARY INDEX, PARTITIONING, OR BOTH' " \
                        "WHEN TABLEKIND= 'U' THEN 'USER-DEFINED DATA TYPE' " \
                        "WHEN TABLEKIND= 'V' THEN 'VIEW' " \
                        "WHEN TABLEKIND= 'X' THEN 'AUTHORIZATION' " \
                        "WHEN TABLEKIND= 'Y' THEN 'GLOP SET' " \
                        "WHEN TABLEKIND= 'Z' THEN 'UIF' " \
                        "END AS OBJECT_TYPE " \
                        ",COUNT(*) AS NUMBER_OF_OBJECTS " \
                        "FROM DBC.TABLES WHERE DATABASENAME =  'TD_BIM_FR_TRNG_DB' " \
                        "GROUP BY 1 " \
                        ") TYPE1 " \
                        "GROUP BY 1,2,3 " \
                        "; " \
                        ""
df = pd.read_sql(query4a_typeofobjects, conn)
print(df)
df.to_csv('Kpi4a_typeofobjects.csv')

query5_nonansi = "SELECT " \
                 "'How much non ANSI SQL is there?' AS KPI_DESCRIPTION " \
                 ",'NON_ANSI_SQL' AS QUALIFIER " \
                 ",COUNT(QUERYTEXT) AS KPI_VALUE " \
                 "FROM DBC.DBQLOGTBL " \
                 "WHERE STATEMENTTYPE LIKE 'Begin%' -----retain string as is " \
                 "GROUP BY 1,2 " \
                 "; " \
                 ""

df = pd.read_sql(query5_nonansi, conn)
print(df)
df.to_csv('Kpi5_NonAnsiSql.csv')

query6_joiner = "SELECT " \
                "'Are the SQL queries mostly using outer joins â€“ FULL, LEFT, RIGHT or mostly INNER joins?' AS KPI_DESCRIPTION " \
                ",'JOINER' AS QUALIFIER   " \
                ",COUNT(QUERYTEXT) AS KPI_VALUE " \
                "FROM DBC.DBQLOGTBL " \
                "WHERE QUERYTEXT LIKE '%JOIN%' " \
                "GROUP BY 1,2 " \
                ";"

df = pd.read_sql(query6_joiner, conn)
print(df)
df.to_csv('Kpi6_joiner.csv')

query7_grouping = "SELECT " \
                  "'Are the SQL queries performing aggregates (group by)? " \
                  "Also are there multiple levels of group by in the same query?' AS KPI_DESCRIPTION " \
                  ",'GROUPING' AS QUALIFIER  " \
                  ",COUNT(QUERYTEXT) AS KPI_VALUE " \
                  "FROM DBC.DBQLOGTBL " \
                  "WHERE QUERYTEXT LIKE '%GROUP%' " \
                  "GROUP BY 1,2 " \
                  ";"

df = pd.read_sql(query7_grouping, conn)
print(df)
df.to_csv('Kpi7_grouping.csv')

query8_otheragg = "SELECT " \
                  "'Are the queries using window aggregations?' AS KPI_DESCRIPTION " \
                  ",'OTHER_AGGREGATIONS' AS QUALIFIER   " \
                  ",COUNT(QUERYTEXT) AS KPI_VALUE " \
                  "FROM DBC.DBQLOGTBL " \
                  "WHERE QUERYTEXT LIKE '%OVER%' " \
                  "GROUP BY 1,2 " \
                  "; " \
                  ""
df = pd.read_sql(query8_otheragg, conn)
print(df)
df.to_csv('Kpi8_OtherAggregations.csv')

query9_recursive = "SELECT " \
                   "'Are there any recursive calls in the SQL (since Teradata supports that)?' AS KPI_DESCRIPTION " \
                   ",'RECURSIVE' AS QUALIFIER   " \
                   ",COUNT(QUERYTEXT) AS KPI_VALUE " \
                   "FROM DBC.DBQLOGTBL " \
                   "WHERE QUERYTEXT LIKE '%RECURSIVE%' " \
                   "GROUP BY 1,2 " \
                   ";"

df = pd.read_sql(query9_recursive, conn)
print(df)
df.to_csv('Kpi9_recursive.csv')

query10_joinedtables = "SELECT " \
                       "'How many tables are typically being joined in the queries â€“ " \
                       "single or multiple fact table and multiple dimensions (star and snowflake joins)?' AS KPI_DESCRIPTION " \
                       ",'NO_OF_TABLES_JOINED' AS QUALIFIER   " \
                       ",COUNT(OBJECTTABLENAME) AS KPI_VALUE " \
                       "FROM DBC.DBQLOBJTBL A " \
                       "WHERE OBJECTTABLENAME IS NOT NULL " \
                       "GROUP BY 1,2 " \
                       "; " \
                       ""
df = pd.read_sql(query10_joinedtables, conn)
print(df)
df.to_csv('Kpi10_NoofJoinedtables.csv')

query11_inserts = "SELECT " \
                  "'Inserts per second, minute, hour, day?' AS KPI_DESCRIPTION " \
                  ",'INSERTS_PER_DAY' AS QUALIFIER " \
                  ",CAST (AVG(INSERTS_ON_RUNDATE) AS INTEGER) AS KPI_VALUE " \
                  "FROM  " \
                  "( SELECT CAST (COLLECTTIMESTAMP AS DATE) AS RUN_DATE " \
                  ",COUNT(QUERYTEXT) AS INSERTS_ON_RUNDATE " \
                  "FROM DBC.DBQLOGTBL A " \
                  "WHERE QUERYTEXT LIKE '%INSERT%' " \
                  "GROUP BY 1 " \
                  ") A " \
                  "GROUP BY 1,2 " \
                  ";"
df = pd.read_sql(query11_inserts, conn)
print(df)
df.to_csv('Kpi11_InsertsPerDay.csv')

query12_updates = "SELECT 'Updates per second, minute, hour, day?' AS KPI_DESCRIPTION " \
                  ",'UPDATES_PER_DAY' AS QUALIFIER ,CAST (AVG(UPDATES_ON_RUNDATE) AS INTEGER) AS KPI_VALUE " \
                  "FROM ( SELECT CAST (COLLECTTIMESTAMP AS DATE) AS RUN_DATE " \
                  ",COUNT(QUERYTEXT) AS UPDATES_ON_RUNDATE FROM DBC.DBQLOGTBL A " \
                  "WHERE QUERYTEXT LIKE '%UPDATE%' GROUP BY 1) A " \
                  "GROUP BY 1,2 " \
                  ";"
df = pd.read_sql(query12_updates, conn)
print(df)
df.to_csv('Kpi12_updatesPerday.csv')

query13_deletes = "SELECT 'Deletes per second, minute, hour, day?' AS KPI_DESCRIPTION ," \
                  "'DELETES_PER_DAY' AS QUALIFIER " \
                  ",CAST (AVG(DELETES_ON_RUNDATE) AS INTEGER) AS KPI_VALUE FROM ( " \
                  "SELECT CAST (COLLECTTIMESTAMP AS DATE) AS RUN_DATE ,COUNT(QUERYTEXT) AS DELETES_ON_RUNDATE " \
                  "FROM DBC.DBQLOGTBL A " \
                  "WHERE QUERYTEXT LIKE '%DELETE%' " \
                  "GROUP BY 1 ) A GROUP BY 1,2 ;"
df = pd.read_sql(query13_deletes, conn)
print(df)
df.to_csv('Kpi13_deletesPerday.csv')

query14_selects = "SELECT 'Selects per second, minute, hour, day?' AS KPI_DESCRIPTION " \
                  ",'SELECTS_PER_DAY' AS QUALIFIER ,CAST (AVG(SELECTS_ON_RUNDATE) AS INTEGER) AS KPI_VALUE FROM ( " \
                  "SELECT CAST (COLLECTTIMESTAMP AS DATE) AS RUN_DATE " \
                  ",COUNT(QUERYTEXT) AS SELECTS_ON_RUNDATE " \
                  "FROM DBC.DBQLOGTBL A " \
                  "WHERE QUERYTEXT LIKE '%SELECT%' " \
                  "GROUP BY 1 ) A GROUP BY 1,2;"
df = pd.read_sql(query14_selects, conn)
print(df)
df.to_csv('Kpi14_SelectsPerDay.csv')

query15_cpu = "SELECT 'What is CPU consumption of the queries?' AS KPI_DESCRIPTION ,'QUERIES_VS_CPU%_USAGE' AS QUALIFIER " \
              ",'TOP5%CPU-'||TRIM(MIN(LIMIT5))||'0A'XC||'TOP10%CPU-'||TRIM(MIN(LIMIT10))||'0A'XC||'TOP25%CPU-'||TRIM(MIN(LIMIT25)) " \
              "||'0A'XC||'TOP50%CPU-'||TRIM(MIN(LIMIT50))||'0A'XC||'TOTALQUERIES-'||TRIM(MAX(RNK))AS KPI_VALUE " \
              "FROM ( SELECT CASE WHEN CPURATIO < 5.00 THEN NULL ELSE RNK END AS LIMIT5 " \
              ",CASE WHEN CPURATIO < 10.00 THEN NULL ELSE RNK END AS LIMIT10 " \
              ",CASE WHEN CPURATIO < 25.00 THEN NULL ELSE RNK END AS LIMIT25 " \
              ",CASE WHEN CPURATIO < 50.00 THEN NULL ELSE RNK END AS LIMIT50 ,RNK " \
              "FROM ( SELECT SUM(AMPCPUTIME) OVER (ORDER BY AMPCPUTIME DESC) AS TOTALCPU " \
              ",SUM(AMPCPUTIME) OVER ( ORDER BY AMPCPUTIME DESC  " \
              "ROWS UNBOUNDED PRECEDING ) AS SUBTOTALCPU ,SUBTOTALCPU * 100.00 / TOTALCPU AS CPURATIO ,SUM(1) OVER ( " \
              "ORDER BY AMPCPUTIME DESC ROWS UNBOUNDED PRECEDING ) AS RNK " \
              "FROM ( " \
              "SELECT * FROM DBC.DBQLOGTBL WHERE " \
              "CAST(STARTTIME AS DATE) = CURRENT_DATE AND AMPCPUTIME > 0) X) Y)Z " \
              "GROUP BY 1,2;"
df = pd.read_sql(query15_cpu, conn)
print(df)
df.to_csv('Kpi15_QueriesVsCpu.csv')

query15a_product = "SELECT 'How many queries are performing poorly due to unnecessary IOs?' AS KPI_DESCRIPTION " \
                   ",'PRODUCT_JOIN_INDICATOR' AS QUALIFIER ,'#Poorly Performing queries-'||TRIM(COUNT(IND)) AS KPI_VALUE " \
                   "FROM ( SELECT CASE WHEN TOTALIOCOUNT = 0 THEN 0 ELSE (AMPCPUTIME * 1000)/TOTALIOCOUNT END AS IND " \
                   "FROM DBC.DBQLOGTBL WHERE IND>3 ) PDTJ " \
                   "GROUP BY 1,2;"
df = pd.read_sql(query15a_product, conn)
print(df)
df.to_csv('Kpi15a_ProductJoinIndicator.csv')

query15b = "SELECT 'How many queries are performing poorly due to product joins?' AS KPI_DESCRIPTION " \
           ",'UNNECESSARY_IO_INDICATOR' AS QUALIFIER " \
           ",'#Poorly Performing queries-'||TRIM(COUNT(IND)) AS KPI_VALUE FROM ( " \
           "SELECT CASE WHEN AMPCPUTime = 0 THEN 0 ELSE TotalIOCount/(AMPCPUTime * 1000) END AS IND " \
           "FROM DBC.DBQLOGTBL " \
           "WHERE IND>3) PDTJ GROUP BY 1,2;"
df = pd.read_sql(query15b, conn)
print(df)
df.to_csv('Kpi15b_Unnecssary_to_indic.csv')

query15c = "SELECT 'How many queries are performing poorly due to CPU skews?' AS KPI_DESCRIPTION " \
           ",'CPU_SKEW_INDICATOR' AS QUALIFIER " \
           ",'#Poorly Performing queries-'||TRIM(COUNT(IND)) AS KPI_VALUE " \
           "FROM ( SELECT CASE WHEN (AMPCPUTime / (HASHAMP()+1)) =0 THEN 0 " \
           "ELSE MaxAmpCPUTime/(AMPCPUTime / (hashamp()+1)) END AS IND " \
           "FROM dbc.dbqlogtbl WHERE IND>3 ) PDTJ GROUP BY 1,2;"
df = pd.read_sql(query15c, conn)
print(df)
df.to_csv('Kpi15c_CPUSkew.csv')

query15d = "SELECT 'How many queries are performing poorly due to IO skews?' AS KPI_DESCRIPTION " \
           ",'IO_SKEW_INDICATOR' AS QUALIFIER ,'#Poorly Performing queries-'||TRIM(COUNT(IND)) AS KPI_VALUE " \
           "FROM ( SELECT CASE WHEN (TotalIOCount / (HASHAMP()+1)) =0 THEN 0  " \
           "ELSE MaxAmpIO/(TotalIOCount / (HASHAMP()+1)) END AS IND " \
           "FROM dbc.dbqlogtbl " \
           "WHERE IND>3 ) PDTJ " \
           "GROUP BY 1,2;"
df = pd.read_sql(query15d, conn)
print(df)
df.to_csv('Kpi15d_IOskew.csv')

query15e = "SELECT 'How many queries are performing poorly due to CPU impact?' AS KPI_DESCRIPTION " \
           ",'CPU_IMPACT_INDICATOR' AS QUALIFIER ,'#Poorly Performing queries-'||TRIM(COUNT(IND)) AS KPI_VALUE " \
           "FROM (SELECT MAXAMPCPUTIME * (HASHAMP()+1) AS IND " \
           "FROM DBC.DBQLOGTBL WHERE IND>3) PDTJ " \
           "GROUP BY 1,2;"
df = pd.read_sql(query15e, conn)
print(df)
df.to_csv('Kpi15e_CPUImpact.csv')

query16_amp = "SELECT 'What is AMP usage and disk I/O?' AS KPI_DESCRIPTION ,'AMP_USAGE' AS QUALIFIER " \
              ",'MAX_CPUTIME (HRS)-'||TRIM(MAX(CPU))||'0A'XC||'MAX_DISKIO (GBps)-'||TRIM ((MAX(DISKIO))) AS KPI_VALUE " \
              "FROM ( SELECT ACCOUNTNAME, USERNAME, (CAST(SUM(CPUTIME) AS INTEGER)/3600) AS CPU,  " \
              "CAST ((SUM(DISKIO)/(1024*1024*1024)) AS DECIMAL(7,2)) AS DISKIO " \
              "FROM DBC.AMPUSAGE " \
              "GROUP BY 1,2 ) AMP1 GROUP BY 1,2;"
df = pd.read_sql(query16_amp, conn)
print(df)
df.to_csv('Kpi16_AmpandDisk.csv')

query17_noofamps = "SELECT 'What is the number of AMPs used?' AS KPI_DESCRIPTION " \
                   ",'NUMBER_OF_AMPS' AS QUALIFIER " \
                   ",HASHAMP()+1 AS KPI_VALUE;"
df = pd.read_sql(query17_noofamps, conn)
print(df)
df.to_csv('Kpi17_NoofAMPs.csv')

query18 = "SELECT 'What is the number of active sessions?' AS KPI_DESCRIPTION,'ACTIVE_SESSIONS' AS QUALIFIER " \
          ",COUNT(DISTINCT SESSIONNO) AS KPI_VALUE FROM (SELECT  " \
          "SESSIONNO, USERNAME, CLIENTIPADDRESS, CLIENTPROGRAMNAME, CLIENTSYSTEMUSERID, CLIENTOSNAME, " \
          "CASE TRANSACTION_MODE WHEN 'A' THEN 'ANSI' " \
          "WHEN 'T' THEN 'TDBS' " \
          "END AS TRANSACTIONMODE, " \
          "CURISOLATIONLEVEL " \
          "FROM DBC.SESSIONINFOV " \
          "GROUP BY 1,2,3,4,5,6,7,8 " \
          ") SESSION1 GROUP BY 1,2;"
df = pd.read_sql(query18, conn)
print(df)
df.to_csv('Kpi18_ActiveSessions.csv')

query18a = "SELECT 'What is the number of concurrent users?' AS KPI_DESCRIPTION " \
           ",'CONCURRENT_USERS' AS QUALIFIER ,CONC_USERS AS KPI_VALUE " \
           "FROM ( SELECT COUNT(*) CONC_USERS FROM DBC.LOGONOFF WHERE LOGONDATE = CURRENT_DATE AND EVENT = 'LOGOFF' " \
           "AND 120000 BETWEEN LOGONTIME AND LOGTIME ) LOGOF " \
           "GROUP BY 1,2,3;"
df = pd.read_sql(query18a, conn)
print(df)
df.to_csv('Kpi18a_ConcurrentUsers.csv')

query20= "SELECT CAST(SUM(MAXPERM)/(1024*1024*1024*1024) AS DECIMAL(7,2)) TOTAL_SYSTEM_SPACE_TB," \
         "CAST(SUM(CURRENTPERM)/(1024*1024*1024*1024) AS DECIMAL(7,2)) CONSUMED_SPACE_TB," \
         "TOTAL_SYSTEM_SPACE_TB-CONSUMED_SPACE_TB AVAILABLE_SPACE_TB " \
         "FROM DBC.DISKSPACEV ;"
df = pd.read_sql(query20, conn)
print(df)
df.to_csv(r'C:\Users\Dilip\PycharmProjects\untitled\venv\Graphs_csv\Domaingraph.csv')

query21 = "SELECT CPU_BUSY_DATE " \
          ",MAX(CASE WHEN HOUR_OF_THE_DAY = 0 THEN CPU_TIME ELSE '' END) " \
          ",MAX(CASE WHEN HOUR_OF_THE_DAY = 1 THEN CPU_TIME ELSE '' END)  " \
          ",MAX(CASE WHEN HOUR_OF_THE_DAY = 2 THEN CPU_TIME ELSE '' END)  " \
          ",MAX(CASE WHEN HOUR_OF_THE_DAY = 3 THEN CPU_TIME ELSE '' END)  " \
          ",MAX(CASE WHEN HOUR_OF_THE_DAY = 4 THEN CPU_TIME ELSE '' END)  " \
          ",MAX(CASE WHEN HOUR_OF_THE_DAY = 5 THEN CPU_TIME ELSE '' END)  " \
          ",MAX(CASE WHEN HOUR_OF_THE_DAY = 6 THEN CPU_TIME ELSE '' END)  " \
          ",MAX(CASE WHEN HOUR_OF_THE_DAY = 7 THEN CPU_TIME ELSE '' END) " \
          ",MAX(CASE WHEN HOUR_OF_THE_DAY = 8 THEN CPU_TIME ELSE '' END) " \
          ",MAX(CASE WHEN HOUR_OF_THE_DAY = 9 THEN CPU_TIME ELSE '' END) " \
          ",MAX(CASE WHEN HOUR_OF_THE_DAY = 10 THEN CPU_TIME ELSE '' END) " \
          ",MAX(CASE WHEN HOUR_OF_THE_DAY = 11 THEN CPU_TIME ELSE '' END) " \
          ",MAX(CASE WHEN HOUR_OF_THE_DAY = 12 THEN CPU_TIME ELSE '' END) " \
          ",MAX(CASE WHEN HOUR_OF_THE_DAY = 13 THEN CPU_TIME ELSE '' END) " \
          ",MAX(CASE WHEN HOUR_OF_THE_DAY = 14 THEN CPU_TIME ELSE '' END) " \
          ",MAX(CASE WHEN HOUR_OF_THE_DAY = 15 THEN CPU_TIME ELSE '' END) " \
          ",MAX(CASE WHEN HOUR_OF_THE_DAY = 16 THEN CPU_TIME ELSE '' END) " \
          ",MAX(CASE WHEN HOUR_OF_THE_DAY = 17 THEN CPU_TIME ELSE '' END) " \
          ",MAX(CASE WHEN HOUR_OF_THE_DAY = 18 THEN CPU_TIME ELSE '' END) " \
          ",MAX(CASE WHEN HOUR_OF_THE_DAY = 19 THEN CPU_TIME ELSE '' END) " \
          ",MAX(CASE WHEN HOUR_OF_THE_DAY = 20 THEN CPU_TIME ELSE '' END) " \
          ",MAX(CASE WHEN HOUR_OF_THE_DAY = 21 THEN CPU_TIME ELSE '' END) " \
          ",MAX(CASE WHEN HOUR_OF_THE_DAY = 22 THEN CPU_TIME ELSE '' END) " \
          ",MAX(CASE WHEN HOUR_OF_THE_DAY = 23 THEN CPU_TIME ELSE '' END) FROM(SELECT " \
          "CAST(STARTTIME AS DATE) AS CPU_BUSY_DATE " \
          ",EXTRACT (HOUR FROM STARTTIME) AS HOUR_OF_THE_DAY " \
          ",ROUND (AVG(AMPCPUTIME),4) AS CPU_TIME " \
          "FROM DBC.DBQLOGTBL " \
          "WHERE EXTRACT (MONTH FROM CPU_BUSY_DATE) = EXTRACT (MONTH FROM DATE) " \
          "AND EXTRACT (YEAR FROM CPU_BUSY_DATE) = EXTRACT (YEAR FROM DATE) " \
          "AND AMPCPUTIME > 0 " \
          "GROUP BY 1,2) TMP " \
          "GROUP BY 1 " \
          "ORDER BY 1 ASC;"
df = pd.read_sql(query21, conn)
print(df)
df.to_csv(r'C:\Users\Dilip\PycharmProjects\untitled\venv\Graphs_csv\heatgraph.csv')

query22 = "SELECT CAST(STARTTIME AS DATE) AS CPU_BUSY_DATE " \
          ",TO_CHAR(STARTTIME, 'DD.MM.YYYY HH:MI') AS TIME_INTERVAL " \
          ",ROUND (AVG(TotalIOCount),2) AS CONSUMED_IOB " \
          "FROM DBC.DBQLOGTBL WHERE EXTRACT (MONTH FROM CPU_BUSY_DATE) = EXTRACT (MONTH FROM DATE) " \
          "AND EXTRACT (YEAR FROM CPU_BUSY_DATE) = EXTRACT (YEAR FROM DATE) " \
          "AND TotalIOCount > 0 " \
          "GROUP BY 1,2;"
df = pd.read_sql(query22, conn)
print(df)
df.to_csv(r'C:\Users\Dilip\PycharmProjects\untitled\venv\Graphs_csv\cpu_graph.csv')



#Combining CSV
#os.chdir(r"C:\Users\Dilip\PycharmProjects\untitled\venv")

extension = 'csv'
all_filenames = [i for i in glob.glob('*.{}'.format(extension))]
print(all_filenames)

#combine all files in the list
combined_csv = pd.concat([pd.read_csv(f) for f in all_filenames ])
#export to csv
combined_csv.to_csv( "combined_csv.csv", index=False, encoding='utf-8-sig')

'''query19 = "SELECT 'What is the total number of cusers?' AS KPI_DESCRIPTION,'TOTAL_USERS' AS QUALIFIER" \
          ",TOT_USERS AS KPI_VALUE " \
          "FROM( SELECT COUNT (*) AS TOT_USERS " \
          "FROM DBC.ACCLOGTBL" \
          ") ACCLOG GROUP BY 1,2,3;"
df = pd.read_sql(query19, conn)
print(df)
df.to_csv('Kpi19_TotalUsers.csv')'''

df = pd.read_csv(r'C:\Users\Dilip\PycharmProjects\untitled\venv\Graphs_csv\cpu_graph.csv')
x = df['TIME_INTERVAL']
y = df['CONSUMED_IOB']
plt.xlabel('Time Interval')
plt.ylabel('Consumed IOB')
plt.title('CPU Graph')
plt.plot(x,y)
plt.show()



























