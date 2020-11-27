/*<sc-procedure> CDW_CODE.ECOS_CONTRCT_MODE_POST_PROC </sc-procedure>*/
  CREATE OR REPLACE EDITIONABLE PROCEDURE "CDW_CODE"."ECOS_CONTRCT_MODE_POST_PROC" (
   i_logdirnm    IN VARCHAR2,
   i_logfilenm   IN VARCHAR2,
   i_appl_nm     IN batch_history.APPLICATION_NM%TYPE,
   i_comp_nm     IN batch_history.COMPONENT_NM%TYPE)
AS
   gplogfilehandler   UTL_FILE.file_type;

   vCurBatchId        BATCH_HISTORY.BATCH_ID%TYPE;
   vPrevBatchId       BATCH_HISTORY.BATCH_ID%TYPE;
   vContModtbl        VARCHAR2 (30);
   vValidInd          VARCHAR2 (1);

   vProcNm            VARCHAR2 (100) := 'ECOS_CONTRCT_MODE_POST_PROC';
   vmstrTblNm         VARCHAR2 (100) := 'CDW_ECOS_WORK.ECOS_POST_CONTRCT_MODE';
   vSqlNo             NUMBER;
   vSqlLoc            VARCHAR2 (1000);
   l_logline          VARCHAR2 (200);
   vRecCnt            NUMBER;
   vSqlStr            VARCHAR2 (3000);
   l_sqlerrmsg        VARCHAR2 (200);
   vUsrErrMsg         VARCHAR2 (200);
   vLogLine           VARCHAR2 (500);
   vFailInd           INTEGER := 0;
   vInnrSQL           VARCHAR2 (2000);
   vUpdSQL            VARCHAR2 (500);
   sql_stmnt          VARCHAR2 (3000);


   CURSOR cur_cont_mod
   IS
        SELECT TBL_NM, VALID_IND
          FROM CDW_ECOS_WORK.ECOS_POST_CONTRCT_MODE
      ORDER BY CONTRCT_MODE_PK_ID;
BEGIN
   gpLogFileHandler := UTIL_PKG.open_file (i_LogDirNm, i_LogFileNm);
   UTL_FILE.NEW_LINE (gpLogFileHandler, 1);
   UTL_FILE.PUT_LINE (
      gpLogFileHandler,
      '*---------------------------------------------------------*');
   UTL_FILE.PUT_LINE (gpLogFileHandler, 'EXECUTING ' || vProcNm);
   UTL_FILE.FFLUSH (gpLogFileHandler);
   UTL_FILE.PUT_LINE (
      gpLogFileHandler,
      'START : ' || TO_CHAR (SYSDATE, 'YYYY-MM-DD HH24:MI:SS'));
   UTL_FILE.NEW_LINE (gpLogFileHandler, 1);
   UTL_FILE.FFLUSH (gpLogFileHandler);

   EXECUTE IMMEDIATE 'alter session set parallel_degree_policy=manual';

   EXECUTE IMMEDIATE 'alter session enable parallel dml';

   EXECUTE IMMEDIATE 'alter session set parallel_force_local=true';


   DBMS_OUTPUT.ENABLE (10000);

   vSqlNo := 1;
   vSqlLoc := 'Get current Batch ID';

   vCurBatchID := batch_id_pkg.get_current_batch_id (i_appl_nm, i_comp_nm);

   vSqlNo := 2;
   vSqlLoc := 'Get previous Batch ID';

   SELECT MAX (PSTG_BATCH_ID)
     INTO vPrevBatchId
     FROM CDW_ECOS_PSTG.ECOS_MD_BATCH_WINDOW_HISTORY
    WHERE DM_BATCH_ID IS NOT NULL;

   vSqlNo := 3;
   vSqlLoc := 'Open Cursor';

   FOR rec_cont_mode IN cur_cont_mod
   LOOP
      vContModtbl := rec_cont_mode.TBL_NM;
      vValidInd := rec_cont_mode.VALID_IND;

      IF vValidInd = 'Y'
      THEN
         vSqlLoc := 'Post Delete statement ';
         vSqlStr :=
               ' DELETE FROM '
            || vContModtbl
            || ' WHERE PUBLICID IN
              (SELECT PUBLICID
                 FROM '
            || vContModtbl
            || '
                 WHERE     SRCE_EFF_START_TMSP > SRCE_EFF_END_TMSP
                      AND BATCH_ID = '
            || vPrevBatchId
            || ' )
                  AND BATCH_ID = '
            || vCurBatchID
            || '
                  AND SRCE_EFF_END_TMSP = TO_TIMESTAMP (''12/31/9999 12:00:00.000000 AM'',''fmMMfm/fmDDfm/YYYY fmHH12fm:MI:SS.FF AM'')';

         vSqlNo := 4;
         vSqlLoc := 'Execute Delete SQL Statement';

         --    UTL_FILE.put_line (gplogfilehandler, vSqlStr);
         EXECUTE IMMEDIATE vSqlStr;

         vRecCnt := SQL%ROWCOUNT;

         COMMIT;

        vLogLine :=
               TO_CHAR (SYSDATE, 'DD-MON-YYYY HH:MI:SS')
            || ' - '
            || LPAD (TO_CHAR (vRecCnt), 6, ' ')
            || ' rows deleted in '
            || RPAD (vContModtbl, 30, ' ');
         UTL_FILE.put_line (gplogfilehandler, vLogLine);

         vSqlLoc := 'Post Update statement ';
         vSqlStr :=
               'UPDATE '
            || vContModtbl
            || ' SET SRCE_EFF_END_TMSP = TO_TIMESTAMP (''12/31/9999 12:00:00.000000 AM'',''fmMMfm/fmDDfm/YYYY fmHH12fm:MI:SS.FF AM'')
            WHERE BATCH_ID = '|| vPrevBatchId||' AND SRCE_EFF_START_TMSP > SRCE_EFF_END_TMSP';

         vSqlNo := 5;
         vSqlLoc := 'Execute Update SQL Statement';

         --    UTL_FILE.put_line (gplogfilehandler, vSqlStr);
         EXECUTE IMMEDIATE vSqlStr;

         vRecCnt := SQL%ROWCOUNT;
         COMMIT;

         vLogLine :=
               TO_CHAR (SYSDATE, 'DD-MON-YYYY HH:MI:SS')
            || ' - '
            || LPAD (TO_CHAR (vRecCnt), 6, ' ')
            || ' rows updated in '
            || RPAD (vContModtbl, 30, ' ');
         UTL_FILE.put_line (gplogfilehandler, vLogLine);

         vSqlLoc := 'Reset Valid Ind ';
         vSqlStr := 'UPDATE ' ||vmstrTblNm||
                     ' SET VALID_IND=''N'' WHERE TBL_NM= '|| ''''||vContModtbl||'''' || ' AND  VALID_IND= '|| ''''||vValidInd||'''';

         vSqlNo := 6;
         vSqlLoc := 'Execute Update SQL Statement';

         --    UTL_FILE.put_line (gplogfilehandler, vSqlStr);
         EXECUTE IMMEDIATE vSqlStr;

         vRecCnt := SQL%ROWCOUNT;

         COMMIT;

         vLogLine :=
               TO_CHAR (SYSDATE, 'DD-MON-YYYY HH:MI:SS')
            || ' - '
            || LPAD (TO_CHAR (vRecCnt), 6, ' ')
            || ' rows updated in '
            || RPAD ('ECOS_POST_CONTRCT_MODE', 30, ' ');
         UTL_FILE.put_line (gplogfilehandler, vLogLine);
         <<skip_cycle>>
         COMMIT;
      ELSE
         vLogLine :=
               TO_CHAR (SYSDATE, 'DD-MON-YYYY HH:MI:SS')
            || ' - No records to be updated/deleted as part of current batch load';
         UTL_FILE.put_line (gplogfilehandler, vLogLine);
      END IF;
   END LOOP;


  EXCEPTION   WHEN OTHERS
      THEN
l_sqlerrmsg := SUBSTR (SQLERRM, 1, 200);
ROLLBACK;
l_logline := 'Error while ' || vSqlLoc;
         UTL_FILE.put_line (gplogfilehandler, l_logline);
         UTL_FILE.put_line (gplogfilehandler, l_sqlerrmsg);
         UTL_FILE.fflush (gplogfilehandler);

         IF UTL_FILE.is_open (gplogfilehandler)
         THEN
            UTL_FILE.fclose (gplogfilehandler);
         END IF;

         RAISE_APPLICATION_ERROR (-20030, l_sqlerrmsg);
    END;
/
/*<sc-procedure> CDW_CODE.ECOS_PERFORMANCE_ANALYSIS </sc-procedure>*/
  CREATE OR REPLACE EDITIONABLE PROCEDURE "CDW_CODE"."ECOS_PERFORMANCE_ANALYSIS" (
                                    i_logdirnm       IN VARCHAR2,
                                   i_logfilenm       IN VARCHAR2,
                                   i_batchid in EDW_SHR.batch_history.batch_id%TYPE ,
                                   i_applnm          IN   entity_mapping.application_nm%TYPE DEFAULT 'ECOS',
                                   i_componentname   IN   entity_mapping.component_nm%TYPE DEFAULT 'ECOS' )

AUTHID CURRENT_USER

IS
v_batchid EDW_SHR.batch_history.batch_id%TYPE DEFAULT batch_id_pkg.get_current_batch_id(i_applnm, i_componentname);
l_procnm    VARCHAR2(50) DEFAULT 'ECOS_PERFORMANCE_ANALYSIS';
v_SelSQL    VARCHAR2(100);
v_DelSQL    VARCHAR2(100);
l_SelSQL    NUMBER;
v_InsSQL    VARCHAR2(4000);
v_Count     NUMBER;
l_sqlerrmsg     VARCHAR2(100);
l_logline       VARCHAR2(100);
l_sqllocator    VARCHAR2(100);

gplogfilehandler      UTL_FILE.file_type;


/******************************************************************************
   NAME:       ECOS_PERFORMANCE_ANALYSIS
   PURPOSE:

   REVISIONS:
   Ver        Date        Author           Description
   ---------  ----------  ---------------  ------------------------------------
   1.0        3/5/2014   COG18011       1. Created this procedure.

   NOTES:

   Automatically available Auto Replace Keywords:
      Object Name:     ECOS_PERFORMANCE_ANALYSIS
      Sysdate:         3/5/2014
      Date and Time:   3/5/2014, 6:10:05 AM, and 3/5/2014 6:10:05 AM
      Username:        COG18011
      Table Name:     ECOS_PERFORM_RSLTS

******************************************************************************/

BEGIN


 gplogfilehandler := util_pkg.open_file (i_logdirnm, i_logfilenm );
   UTL_FILE.new_line (gplogfilehandler, 1);
   UTL_FILE.put_line (gplogfilehandler, '**********************************************************************');
   UTL_FILE.put_line (gplogfilehandler, 'EXECUTING the  Procedure : ' || l_procnm);
   UTL_FILE.put_line (gplogfilehandler, '**********************************************************************');
   UTL_FILE.put_line (gplogfilehandler, '  ');
   UTL_FILE.put_line (gplogfilehandler, 'START TIME : ' || TO_CHAR (SYSDATE, 'DD-MON-YYYY HH:MI:SS'));
   UTL_FILE.fflush (gplogfilehandler);

    IF i_batchid IS NOT NULL THEN
       v_batchid := i_batchid;
    END IF;
    l_SelSQL := 0;
    v_Count  := 0;



    l_sqllocator := 'Delete from CDW_ECOS_WORK.ECOS_PERFORM_RSLTS if records already present for BatchID';
   v_SelSQL := 'SELECT COUNT(*) FROM CDW_ECOS_WORK.ECOS_PERFORM_RSLTS WHERE BATCH_ID ='||v_batchid;
   v_DelSQL := 'DELETE FROM CDW_ECOS_WORK.ECOS_PERFORM_RSLTS WHERE BATCH_ID ='||v_batchid;
   EXECUTE IMMEDIATE v_SelSQL into l_SelSQL;
   IF l_SelSQL >0 THEN
       EXECUTE IMMEDIATE v_DelSQL;
       COMMIT;
       UTL_FILE.put_line(gplogfilehandler, l_SelSQL||' rows deleted for BatchId : '||v_batchid);
  END IF;

   l_sqllocator := 'Insert into CDW_ECOS_WORK.ECOS_PERFORM_RSLTS for BatchID '||v_batchid;
   v_InsSQL := 'INSERT INTO CDW_ECOS_WORK.ECOS_PERFORM_RSLTS
                        SELECT ES.BATCH_ID, ES.ENTITY_MAPPING_PK_ID, EM.SRC_SCHEMA, EM.SRC_NM,
                                       EM.TGT_SCHEMA, EM.TGT_NM,ES.PROCESS_NM, ES.START_TM, ES.END_TM,
                                        ROUND(TO_NUMBER(ES.END_TM - ES.START_TM)) AS RUN_TIME_DAYS,
                                       CASE
                                       WHEN ROUND(TO_NUMBER(ES.END_TM - ES.START_TM)*24,2) > 1
                                       THEN ROUND(TO_NUMBER(ES.END_TM - ES.START_TM)*24,2)
                                       ELSE ROUND(TO_NUMBER(ES.END_TM - ES.START_TM)*24)
                                       END AS RUN_TIME_HOURS,
                                       ROUND(TO_NUMBER(ES.END_TM - ES.START_TM)*(24*60)) AS RUN_TIME_MINS,
                                       ROUND(TO_NUMBER(ES.END_TM - ES.START_TM)*(24*60*60)) AS RUN_TIME_SECS,
                                       ES.SRC_CNTS, ES.TGT_CNTS,
                                       EM.APPLICATION_NM, EM.COMPONENT_NM,  EM.ENTITY_MAPPING_TYP_CD, EM.ENTITY_MAPPING_GRP_CD
                       FROM EDW_SHR.ENTITY_PROCESS_STATUS ES
                       INNER JOIN EDW_SHR.ENTITY_MAPPING EM  ON EM.ENTITY_MAPPING_PK_ID = ES.ENTITY_MAPPING_PK_ID
                                    WHERE EM.APPLICATION_NM = '''||I_APPLNM ||
                                    ''' AND EM.COMPONENT_NM = '''||I_COMPONENTNAME ||
                                    ''' AND EM.VALID_IND = ''Y''
                                    AND ES.BATCH_ID = ' || V_BATCHID ;

   EXECUTE IMMEDIATE v_InsSQL;
   v_Count := SQL%ROWCOUNT;
   EXECUTE IMMEDIATE('COMMIT');
   IF  v_Count = 0
    THEN
        --dbms_output.put_line('No rows inserted for BatchId : '||v_batchid);
        UTL_FILE.put_line(gplogfilehandler, 'No rows inserted for BatchId : '||v_batchid);
    ELSE
        --dbms_output.put_line(v_Count||' rows inserted for BatchId : '||v_batchid);
        UTL_FILE.put_line(gplogfilehandler, v_Count||' rows inserted for BatchId : '||v_batchid);
   END IF;

   UTL_FILE.fflush (gplogfilehandler);
      UTL_FILE.fclose (gplogfilehandler);

EXCEPTION

    WHEN OTHERS THEN
       l_sqlerrmsg := SUBSTR (SQLERRM, 1, 80);
       ROLLBACK;

       l_logline := 'Error while ' || l_sqllocator;
       UTL_FILE.put_line (gplogfilehandler, l_logline);
       UTL_FILE.put_line (gplogfilehandler, l_sqlerrmsg);
       UTL_FILE.fflush (gplogfilehandler);

       IF UTL_FILE.is_open (gplogfilehandler) THEN
          UTL_FILE.fclose (gplogfilehandler);
       END IF;
       RAISE_APPLICATION_ERROR (-20030, l_sqlerrmsg);


END ECOS_PERFORMANCE_ANALYSIS;
/

