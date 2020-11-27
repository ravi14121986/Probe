 CREATE OR REPLACE FORCE EDITIONABLE VIEW "EDW_DM_DLV"."WC_FNOL_VW" ("ACCT_NUM", "INSD_LOC_RPT_CD", "FNOL_CALL_COMPL_IND", "LOSS_RPRT_DT", "LOSS_TIME_IND", "LOSS_EVNT_NUM", "LOSS_LOC_ST_ABBR", "INCID_ONLY_CLM_IND", "FNOL_EST_RTW_DT", "EE_RTW_DT", "EE_RTRN_TO_WORK_IND", "CLM_PLUS_IND", "LOSS_RPRT_METH_CD", "LOSS_RPRT_METH_DESC", "ACCID_ON_PREMIS_IND", "EQUIP_INVOLV_IN_ACCID_IND", "THIRD_PRTY_INVOLV_IND", "MACH_DEFCT_IND", "OFFR_OWNR_PRTNR_IND", "EE_WORK_DUTY_TYP_CD", "EE_WORK_DUTY_TYP_DESC", "CLMNT_RCV_TREAT_IND", "FNOL_EMERG_TRANS_TYP_CD", "FNOL_EMERG_TRANS_TYP_DESC", "CLMNT_ADMIT_TO_HOSP_IND", "FUT_MED_TREATS_EXPCT_IND", "QUES_INJ_IND", "FIRST_LOST_WORK_DAY_DT", "BODY_PART_CD", "BODY_PART_DESC", "NCCI_INJ_CAUSE_CD", "NCCI_INJ_CAUSE_DESC", "ACCID_RPT_TO_INSD_DT", "INIT_TREAT_DESC", "DTLED_INJ_CD", "INJ_TYP_DESC", "LAST_WORK_DAY_DT", "ACCT_NM", "EMPLOYEE_AGE", "CLMNT_DOB", "CLM_RPRT_BY_CD", "CLM_RPRT_BY_DESC", "LOSS_CS_CD", "LOSS_CS_DESC", "CLM_ID", "LOB_CD", "LOB_DESC", "LOSS_DT", "POL_ID", "CLM_SEG_CD", "CLM_SEG_DESC", "WC_EE_TYP_CD", "WC_EE_TYP_DESC", "ACTL_DAYS_LOST_UNTL_FNOL_NUM", "BODY_PART_SBTYP_CD", "BODY_PART_SBTYP_DESC", "PRIM_BODY_PART_INJ_IND") AS
  SELECT ACCT_NUM,
          INSD_LOC_RPT_CD,
          FNOL_CALL_COMPL_IND,
          LOSS_RPRT_DT,
          LOSS_TIME_IND,
          LOSS_EVNT_NUM,
          LOSS_LOC_ST_ABBR,
          INCID_ONLY_CLM_IND,
          FNOL_EST_RTW_DT,
          EE_RTW_DT,
          EE_RTRN_TO_WORK_IND,
          CLM_PLUS_IND,
          LOSS_RPRT_METH_CD,
          LOSS_RPRT_METH_DESC,
          ACCID_ON_PREMIS_IND,
          EQUIP_INVOLV_IN_ACCID_IND,
          THIRD_PRTY_INVOLV_IND,
          MACH_DEFCT_IND,
          OFFR_OWNR_PRTNR_IND,
          EE_WORK_DUTY_TYP_CD,
          EE_WORK_DUTY_TYP_DESC,
          CLMNT_RCV_TREAT_IND,
          FNOL_EMERG_TRANS_TYP_CD,
          FNOL_EMERG_TRANS_TYP_DESC,
          CLMNT_ADMIT_TO_HOSP_IND,
          FUT_MED_TREATS_EXPCT_IND,
          QUES_INJ_IND,
          FIRST_LOST_WORK_DAY_DT,
          BODY_PART_CD,
          BODY_PART_DESC,
          NCCI_INJ_CAUSE_CD,
          NCCI_INJ_CAUSE_DESC,
          ACCID_RPT_TO_INSD_DT,
          INIT_TREAT_DESC,
          DTLED_INJ_CD,
          INJ_TYP_DESC,
          LAST_WORK_DAY_DT,
          ACCT_NM,
          FLOOR (
             MONTHS_BETWEEN (TRUNC (LOSS_RPRT_DT), TRUNC (CLMNT_DOB)) / 12)
             AS EMPLOYEE_AGE,
          CLMNT_DOB,
          CLM_RPRT_BY_CD,
          CLM_RPRT_BY_DESC,
          LOSS_CS_CD,
          LOSS_CS_DESC,
          CLM_ID,
          LOB_CD,
          LOB_DESC,
          LOSS_DT,
          POL_ID,
          CLM_SEG_CD,
          CLM_SEG_DESC,
          WC_EE_TYP_CD,
          WC_EE_TYP_DESC,
          ACTL_DAYS_LOST_UNTL_FNOL_NUM,
          BODY_PART_SBTYP_CD,
          BODY_PART_SBTYP_DESC,
          PRIM_BODY_PART_INJ_IND
     FROM (SELECT AS_OF_DT_PK_ID,                             --  Defect# 9859
                  ACCT_NUM,
                  INSD_LOC_RPT_CD,
                  FNOL_CALL_COMPL_IND,
                  LOSS_RPRT_DT,
                  LOSS_TIME_IND,
                  LOSS_EVNT_NUM,
                  LOSS_LOC_ST_ABBR,
                  INCID_ONLY_CLM_IND,
                  FNOL_EST_RTW_DT,
                  EE_RTW_DT,
                  EE_RTRN_TO_WORK_IND,
                  CLM_PLUS_IND,
                  LOSS_RPRT_METH_CD,
                  LOSS_RPRT_METH_DESC,
                  ACCID_ON_PREMIS_IND,
                  EQUIP_INVOLV_IN_ACCID_IND,
                  THIRD_PRTY_INVOLV_IND,
                  MACH_DEFCT_IND,
                  OFFR_OWNR_PRTNR_IND,
                  EE_WORK_DUTY_TYP_CD,
                  EE_WORK_DUTY_TYP_DESC,
                  CLMNT_RCV_TREAT_IND,
                  FNOL_EMERG_TRANS_TYP_CD,
                  FNOL_EMERG_TRANS_TYP_DESC,
                  CLMNT_ADMIT_TO_HOSP_IND,
                  FUT_MED_TREATS_EXPCT_IND,
                  QUES_INJ_IND,
                  FIRST_LOST_WORK_DAY_DT,
                  BODY_PART_CD,
                  BODY_PART_DESC,
                  NCCI_INJ_CAUSE_CD,
                  NCCI_INJ_CAUSE_DESC,
                  ACCID_RPT_TO_INSD_DT,
                  INIT_TREAT_DESC,
                  DTLED_INJ_CD,
                  INJ_TYP_DESC,
                  LAST_WORK_DAY_DT,
                  ACCT_NM,
                  FLOOR (
                       MONTHS_BETWEEN (TRUNC (LOSS_RPRT_DT),
                                       TRUNC (CLMNT_DOB))
                     / 12)
                     AS EMPLOYEE_AGE,
                  CLMNT_DOB,
                  CLM_RPRT_BY_CD,
                  CLM_RPRT_BY_DESC,
                  LOSS_CS_CD,
                  LOSS_CS_DESC,
                  CLM_ID,
                  LOB_CD,
                  LOB_DESC,
                  LOSS_DT,
                  POL_ID,
                  CLM_SEG_CD,
                  CLM_SEG_DESC,
                  WC_EE_TYP_CD,
                  WC_EE_TYP_DESC,
                  ACTL_DAYS_LOST_UNTL_FNOL_NUM,
                  BODY_PART_SBTYP_CD,
                  BODY_PART_SBTYP_DESC,
                  PRIM_BODY_PART_INJ_IND,
                  ROW_NUMBER ()
                  OVER (PARTITION BY LOSS_EVNT_NUM ORDER BY AS_OF_DT_PK_ID)
                     RNK1
             FROM (SELECT CF.AS_OF_DT_PK_ID,                   -- DEFECT  9859
                          AC.ACCT_NUM,
                          LP.INSD_LOC_RPT_CD,
                          LEM.FNOL_CALL_COMPL_IND,
                          LEM.LOSS_RPRT_DT,
                          LEM.LOSS_TIME_IND,
                          LEM.LOSS_EVNT_NUM,
                          LEM.LOSS_LOC_ST_ABBR,
                          LEM.INCID_ONLY_CLM_IND,
                          EMP.FNOL_EST_RTW_DT,
                          EMP.EE_RTW_DT,
                          LEM.EE_RTRN_TO_WORK_IND,
                          LP.CLM_PLUS_IND,
                          LEM.LOSS_RPRT_METH_CD,
                          LEM.LOSS_RPRT_METH_DESC,
                          LEM.ACCID_ON_PREMIS_IND,
                          LEM.EQUIP_INVOLV_IN_ACCID_IND,
                          LEM.THIRD_PRTY_INVOLV_IND,
                          LEM.MACH_DEFCT_IND,
                          EMP.OFFR_OWNR_PRTNR_IND,
                          EMP.EE_WORK_DUTY_TYP_CD,
                          EMP.EE_WORK_DUTY_TYP_DESC,
                          LEM.CLMNT_RCV_TREAT_IND,
                          LEM.FNOL_EMERG_TRANS_TYP_CD,
                          LEM.FNOL_EMERG_TRANS_TYP_DESC,
                          LEM.CLMNT_ADMIT_TO_HOSP_IND,
                          LEM.FUT_MED_TREATS_EXPCT_IND,
                          LEM.QUES_INJ_IND,
                          EMP.FIRST_LOST_WORK_DAY_DT,
                          BPM.BODY_PART_CD,
                          BPM.BODY_PART_DESC,
                          LEM.NCCI_INJ_CAUSE_CD,
                          LEM.NCCI_INJ_CAUSE_DESC,
                          LEM.ACCID_RPT_TO_INSD_DT,
                          LEM.INIT_TREAT_DESC,
                          BPM.DTLED_INJ_CD,
                          BPM.INJ_TYP_DESC,
                          EMP.LAST_WORK_DAY_DT,
                          AC.ACCT_NM,
                          FLOOR (
                               MONTHS_BETWEEN (TRUNC (LEM.LOSS_RPRT_DT),
                                               TRUNC (CLMNT.CLMNT_DOB))
                             / 12)
                             AS EMPLOYEE_AGE,
                          CLMNT.CLMNT_DOB,
                          LEM.CLM_RPRT_BY_CD,
                          LEM.CLM_RPRT_BY_DESC,
                          LEM.LOSS_CS_CD,
                          LEM.LOSS_CS_DESC,
                          CLM.CLM_ID,
                          LOB.LOB_CD,
                          LOB.LOB_DESC,
                          LEM.LOSS_DT,
                          LP.POL_ID,
                          LEM.CLM_SEG_CD,
                          LEM.CLM_SEG_DESC,
                          EMP.WC_EE_TYP_CD,
                          EMP.WC_EE_TYP_DESC,
                          LEM.ACTL_DAYS_LOST_UNTL_FNOL_NUM,
                          BPM.BODY_PART_SBTYP_CD,
                          BPM.BODY_PART_SBTYP_DESC,
                          BPM.PRIM_BODY_PART_INJ_IND
                     FROM (SELECT CF.LOSS_EVNT_GID,
                                  CF.AS_OF_DT_PK_ID,           --  DEFECT 9859
                                  CF.INCID_GID,
                                  CF.CLM_GID,
                                  CF.CLMNT_GID,
                                  CF.EMPLY_GID,
                                  CF.LOB_PK_ID,
                                  CF.ACCT_GID,
                                  CF.LOSS_POL_GID,
                                  ROW_NUMBER ()
                                  OVER (PARTITION BY CF.LOSS_EVNT_GID
                                        ORDER BY CF.LOSS_EVNT_PK_ID)
                                     RNK
                             FROM CLAIM_ALL_FIN_SNAP_FACT_VW CF,
                                  LOSS_EVENT_DIM LE
                            WHERE     CF.LOB_PK_ID =
                                         (SELECT LOB_PK_ID
                                            FROM LINE_OF_BUSINESS_DIM
                                           WHERE UPPER (LOB_CD) =
                                                    'WORKERSCOMPLINE')
                                  AND LE.LOSS_EVNT_GID = CF.LOSS_EVNT_GID
                                  AND LE.DEL_IND = 'N'
                                  AND UPPER (LE.LOSS_EVNT_STTS_CD) <> 'DRAFT'
                                  AND CF.CLM_GID <> 0
                                  AND LE.CLM_CNTR_CONV_IND = 'N') CF,
                          (SELECT LE.LOSS_EVNT_GID,
                                  LE.FNOL_CALL_COMPL_IND,
                                  LE.LOSS_RPRT_DT,
                                  LE.LOSS_TIME_IND,
                                  LE.LOSS_LOC_ST_ABBR,
                                  LE.LOSS_EVNT_NUM,
                                  LE.EE_RTRN_TO_WORK_IND,
                                  LE.LOSS_RPRT_METH_CD,
                                  LE.LOSS_RPRT_METH_DESC,
                                  LE.ACCID_ON_PREMIS_IND,
                                  LE.EQUIP_INVOLV_IN_ACCID_IND,
                                  LE.THIRD_PRTY_INVOLV_IND,
                                  LE.MACH_DEFCT_IND,
                                  LE.INCID_ONLY_CLM_IND,
                                  LE.CLMNT_RCV_TREAT_IND,
                                  LE.FNOL_EMERG_TRANS_TYP_CD,
                                  LE.FNOL_EMERG_TRANS_TYP_DESC,
                                  LE.CLMNT_ADMIT_TO_HOSP_IND,
                                  LE.FUT_MED_TREATS_EXPCT_IND,
                                  LE.QUES_INJ_IND,
                                  LE.NCCI_INJ_CAUSE_CD,
                                  LE.NCCI_INJ_CAUSE_DESC,
                                  LE.ACCID_RPT_TO_INSD_DT,
                                  LE.INIT_TREAT_DESC,
                                  LE.CLM_RPRT_BY_CD,
                                  LE.CLM_RPRT_BY_DESC,
                                  LE.LOSS_CS_CD,
                                  LE.LOSS_CS_DESC,
                                  LE.LOSS_DT,
                                  LE.CLM_SEG_CD,
                                  LE.CLM_SEG_DESC,
                                  LE.ACTL_DAYS_LOST_UNTL_FNOL_NUM,
                                  RANK ()
                                  OVER (PARTITION BY LOSS_EVNT_GID
                                        ORDER BY LOSS_EVNT_PK_ID)
                                     RNK
                             FROM LOSS_EVENT_DIM LE
                            WHERE     LE.DEL_IND = 'N'
                                  AND UPPER (LE.LOSS_EVNT_STTS_CD) <> 'DRAFT'
                                  AND LE.CLM_CNTR_CONV_IND = 'N') LEM,
                          (SELECT BP.INCID_GID,
                                  BP.BODY_PART_GID,
                                  BP.BODY_PART_PK_ID,
                                  BP.BODY_PART_CD,
                                  BP.BODY_PART_DESC,
                                  BP.DTLED_INJ_CD,
                                  BP.INJ_TYP_DESC,
                                  BP.BODY_PART_SBTYP_CD,   -- 9859, 5289, 6640
                                  BP.BODY_PART_SBTYP_DESC, -- 9859, 5289, 6640
                                  BP.PRIM_BODY_PART_INJ_IND, -- 9859, 5289, 6640
                                  /*RANK ()
                                     OVER (PARTITION BY INCID_GID ORDER BY BODY_PART_PK_ID)
                                     RNK */
                                  ROW_NUMBER ()
                                  OVER (
                                     PARTITION BY INCID_GID
                                     ORDER BY
                                        BATCH_ID,
                                        DECODE (BP.PRIM_BODY_PART_INJ_IND,
                                                'Y', '0',
                                                '1'),
                                        BODY_PART_PK_ID)
                                     RNK                   -- 9859, 5289, 6640
                             FROM BODY_PART_DIM BP
                            WHERE --PRIM_BODY_PART_INJ_IND = 'Y' AND   -- 9859, 5289, 6640
                                 BP.DEL_IND = 'N') BPM,
                          (SELECT CLM.CLM_GID,
                                  CLM.CLM_PK_ID,
                                  CLM.CLM_ID,
                                  RANK ()
                                  OVER (PARTITION BY CLM_GID
                                        ORDER BY CLM_PK_ID)
                                     RNK
                             FROM CLAIM_DIM CLM
                            WHERE CLM.DEL_IND = 'N') CLM,
                          (SELECT CLMNT.CLMNT_DOB,
                                  CLMNT.CLMNT_PK_ID,
                                  CLMNT.CLMNT_GID,
                                  RANK ()
                                  OVER (PARTITION BY CLMNT_GID
                                        ORDER BY CLMNT_PK_ID)
                                     RNK
                             FROM CLAIMANT_DIM CLMNT
                            WHERE CLMNT.DEL_IND = 'N') CLMNT,
                          (SELECT EMP.EMPLY_GID,
                                  EMP.EMPLY_PK_ID,
                                  EMP.FNOL_EST_RTW_DT,
                                  EMP.EE_RTW_DT,
                                  EMP.OFFR_OWNR_PRTNR_IND,
                                  EMP.EE_WORK_DUTY_TYP_CD,
                                  EMP.EE_WORK_DUTY_TYP_DESC,
                                  EMP.FIRST_LOST_WORK_DAY_DT,
                                  EMP.LAST_WORK_DAY_DT,
                                  EMP.WC_EE_TYP_CD,
                                  EMP.WC_EE_TYP_DESC,
                                  RANK ()
                                  OVER (PARTITION BY EMPLY_GID
                                        ORDER BY EMPLY_PK_ID)
                                     RNK
                             FROM EMPLOYMENT_DIM EMP
                            WHERE EMP.DEL_IND = 'N') EMP,
                          (SELECT LOB.LOB_PK_ID,
                                  LOB.LOB_GID,
                                  LOB.LOB_CD,
                                  LOB.LOB_DESC,
                                  RANK ()
                                  OVER (PARTITION BY LOB_GID
                                        ORDER BY LOB_PK_ID)
                                     RNK
                             FROM LINE_OF_BUSINESS_DIM LOB
                            WHERE LOB.DEL_IND = 'N') LOB,
                          (SELECT AC.ACCT_GID,
                                  AC.ACCT_PK_ID,
                                  AC.ACCT_NUM,
                                  AC.ACCT_NM,
                                  RANK ()
                                  OVER (PARTITION BY ACCT_GID
                                        ORDER BY ACCT_PK_ID)
                                     RNK
                             FROM ACCOUNT_DIM AC
                            WHERE AC.DEL_IND = 'N') AC,
                          (SELECT LP.LOSS_POL_PK_ID,
                                  LP.LOSS_POL_GID,
                                  LP.INSD_LOC_RPT_CD,
                                  LP.CLM_PLUS_IND,
                                  LP.POL_ID,
                                  RANK ()
                                  OVER (PARTITION BY LOSS_POL_GID
                                        ORDER BY LOSS_POL_PK_ID)
                                     RNK
                             FROM LOSS_POLICY_DIM LP
                            WHERE LP.DEL_IND = 'N') LP
                    WHERE     CF.RNK = 1
                          AND CF.LOSS_EVNT_GID = LEM.LOSS_EVNT_GID
                          AND LEM.RNK = 1
                          AND CF.INCID_GID = BPM.INCID_GID(+)
                          AND BPM.RNK(+) = 1
                          AND CF.CLM_GID = CLM.CLM_GID
                          AND CLM.RNK = 1
                          AND CF.CLMNT_GID = CLMNT.CLMNT_GID
                          AND CLMNT.RNK = 1
                          AND CF.EMPLY_GID = EMP.EMPLY_GID(+)
                          AND EMP.RNK(+) = 1
                          AND CF.LOB_PK_ID = LOB.LOB_PK_ID
                          AND LOB.RNK = 1
                          AND CF.ACCT_GID = AC.ACCT_GID(+)
                          AND AC.RNK(+) = 1
                          AND CF.LOSS_POL_GID = LP.LOSS_POL_GID
                          AND LP.RNK = 1
                   UNION ALL
                   SELECT A.AS_OF_DT_PK_ID,                    --  DEFECT 9859
                          AC.ACCT_NUM,
                          LP.INSD_LOC_RPT_CD,
                          LE.FNOL_CALL_COMPL_IND,
                          LE.LOSS_RPRT_DT,
                          LE.LOSS_TIME_IND,
                          LE.LOSS_EVNT_NUM,
                          LE.LOSS_LOC_ST_ABBR,
                          LE.INCID_ONLY_CLM_IND,
                          EMP.FNOL_EST_RTW_DT,
                          EMP.EE_RTW_DT,
                          LE.EE_RTRN_TO_WORK_IND,
                          LP.CLM_PLUS_IND,
                          LE.LOSS_RPRT_METH_CD,
                          LE.LOSS_RPRT_METH_DESC,
                          LE.ACCID_ON_PREMIS_IND,
                          LE.EQUIP_INVOLV_IN_ACCID_IND,
                          LE.THIRD_PRTY_INVOLV_IND,
                          LE.MACH_DEFCT_IND,
                          EMP.OFFR_OWNR_PRTNR_IND,
                          EMP.EE_WORK_DUTY_TYP_CD,
                          EMP.EE_WORK_DUTY_TYP_DESC,
                          LE.CLMNT_RCV_TREAT_IND,
                          LE.FNOL_EMERG_TRANS_TYP_CD,
                          LE.FNOL_EMERG_TRANS_TYP_DESC,
                          LE.CLMNT_ADMIT_TO_HOSP_IND,
                          LE.FUT_MED_TREATS_EXPCT_IND,
                          LE.QUES_INJ_IND,
                          EMP.FIRST_LOST_WORK_DAY_DT,
                          A.BODY_PART_CD,
                          A.BODY_PART_DESC,
                          LE.NCCI_INJ_CAUSE_CD,
                          LE.NCCI_INJ_CAUSE_DESC,
                          LE.ACCID_RPT_TO_INSD_DT,
                          LE.INIT_TREAT_DESC,
                          A.DTLED_INJ_CD,
                          A.INJ_TYP_DESC,
                          EMP.LAST_WORK_DAY_DT,
                          AC.ACCT_NM,
                          ROUND (
                               MONTHS_BETWEEN (TRUNC (LE.LOSS_RPRT_DT),
                                               TRUNC (CLMNT.CLMNT_DOB))
                             / 12)
                             AS EMPLOYEE_AGE,
                          CLMNT.CLMNT_DOB,
                          LE.CLM_RPRT_BY_CD,
                          LE.CLM_RPRT_BY_DESC,
                          LE.LOSS_CS_CD,
                          LE.LOSS_CS_DESC,
                          CLM.CLM_ID,
                          LOB.LOB_CD,
                          LOB.LOB_DESC,
                          LE.LOSS_DT,
                          LP.POL_ID,
                          LE.CLM_SEG_CD,
                          LE.CLM_SEG_DESC,
                          EMP.WC_EE_TYP_CD,
                          EMP.WC_EE_TYP_DESC,
                          LE.ACTL_DAYS_LOST_UNTL_FNOL_NUM,
                          A.BODY_PART_SBTYP_CD,
                          A.BODY_PART_SBTYP_DESC,
                          A.PRIM_BODY_PART_INJ_IND
                     FROM (SELECT EF_UNION.AS_OF_DT_PK_ID,     -- DEFECT  9859
                                  EF_UNION.LOSS_EVNT_GID,
                                  EF_UNION.INCID_GID,
                                  EF_UNION.CLM_GID,
                                  EF_UNION.CLMNT_GID,
                                  EF_UNION.EMPLY_GID,
                                  EF_UNION.LOB_PK_ID,
                                  EF_UNION.ACCT_GID,
                                  EF_UNION.LOSS_POL_GID,
                                  BP.BODY_PART_GID,
                                  BP.BODY_PART_CD,
                                  BP.BODY_PART_DESC,
                                  BP.DTLED_INJ_CD,
                                  BP.INJ_TYP_DESC,
                                  BP.BODY_PART_SBTYP_CD,
                                  BP.BODY_PART_SBTYP_DESC,
                                  BP.PRIM_BODY_PART_INJ_IND,
                                  ROW_NUMBER ()
                                  OVER (
                                     PARTITION BY LOSS_EVNT_GID
                                     ORDER BY
                                        DECODE (BP.INCID_GID, NULL, '1', '0'))
                                     RNK
                             FROM    (SELECT DISTINCT EF.LOSS_EVNT_GID,
                                                      AS_OF_DT_PK_ID, --  DEFECT  9859
                                                      EF.INCID_GID,
                                                      EF.CLM_GID,
                                                      EF.CLMNT_GID,
                                                      EF.EMPLY_GID,
                                                      EF.LOB_PK_ID,
                                                      EF.ACCT_GID,
                                                      EF.LOSS_POL_GID
                                        FROM (SELECT LOSS_EVNT_GID,
                                                     AS_OF_DT_PK_ID, -- DEFECT  9859
                                                     INCID_GID,
                                                     CLM_GID,
                                                     CLMNT_GID,
                                                     EMPLY_GID,
                                                     LOB_PK_ID,
                                                     ACCT_GID,
                                                     LOSS_POL_GID
                                                FROM (SELECT EF2.LOSS_EVNT_GID,
                                                             AS_OF_DT_PK_ID, -- DEFECT 9859
                                                             EF2.INCID_GID,
                                                             EF2.CLM_GID,
                                                             EF2.CLMNT_GID,
                                                             EF2.EMPLY_GID,
                                                             EF2.LOB_PK_ID,
                                                             EF2.ACCT_GID,
                                                             EF2.LOSS_POL_GID,
                                                             RANK ()
                                                             OVER (
                                                                PARTITION BY EF2.LOSS_EVNT_GID
                                                                ORDER BY
                                                                   EF2.LOSS_EVNT_PK_ID)
                                                                RNK
                                                        FROM EXPOSURE_ALL_FIN_SNAP_FACT_VW EF2,
                                                             LOSS_EVENT_DIM LE
                                                       WHERE     LE.LOSS_EVNT_GID =
                                                                    EF2.LOSS_EVNT_GID
                                                             AND LE.DEL_IND =
                                                                    'N'
                                                             AND UPPER (
                                                                    LE.LOSS_EVNT_STTS_CD) <>
                                                                    'DRAFT'
                                                             AND LE.CLM_CNTR_CONV_IND =
                                                                    'N'
                                                             AND LOB_PK_ID =
                                                                    (SELECT LOB_PK_ID
                                                                       FROM LINE_OF_BUSINESS_DIM
                                                                      WHERE UPPER (
                                                                               LOB_CD) =
                                                                               'WORKERSCOMPLINE')
                                                             AND EXISTS
                                                                    (SELECT EF1.LOSS_EVNT_GID
                                                                       FROM EXPOSURE_ALL_FIN_SNAP_FACT_VW EF1
                                                                      WHERE     EXPSR_PK_ID <>
                                                                                   -2
                                                                            AND CLM_PK_ID =
                                                                                   -1
                                                                            AND EF1.LOSS_EVNT_GID =
                                                                                   EF2.LOSS_EVNT_GID))
                                               WHERE RNK = 1
                                              UNION ALL
                                              SELECT LOSS_EVNT_GID,
                                                     AS_OF_DT_PK_ID, --   defect 9859
                                                     INCID_GID,
                                                     CLM_GID,
                                                     CLMNT_GID,
                                                     EMPLY_GID,
                                                     LOB_PK_ID,
                                                     ACCT_GID,
                                                     LOSS_POL_GID
                                                FROM (SELECT EF2.LOSS_EVNT_GID,
                                                             AS_OF_DT_PK_ID, -- DEFECT  9859
                                                             EF2.INCID_GID,
                                                             EF2.CLM_GID,
                                                             EF2.CLMNT_GID,
                                                             EF2.EMPLY_GID,
                                                             EF2.LOB_PK_ID,
                                                             EF2.ACCT_GID,
                                                             EF2.LOSS_POL_GID,
                                                             RANK ()
                                                             OVER (
                                                                PARTITION BY EF2.LOSS_EVNT_GID
                                                                ORDER BY
                                                                   EF2.LOSS_EVNT_PK_ID)
                                                                RNK
                                                        FROM EXPOSURE_ALL_FIN_SNAP_FACT_VW EF2,
                                                             LOSS_EVENT_DIM LE
                                                       WHERE     LE.LOSS_EVNT_GID =
                                                                    EF2.LOSS_EVNT_GID
                                                             AND LE.DEL_IND =
                                                                    'N'
                                                             AND UPPER (
                                                                    LE.LOSS_EVNT_STTS_CD) <>
                                                                    'DRAFT'
                                                             AND LE.CLM_CNTR_CONV_IND =
                                                                    'N'
                                                             AND LOB_PK_ID =
                                                                    (SELECT LOB_PK_ID
                                                                       FROM LINE_OF_BUSINESS_DIM
                                                                      WHERE UPPER (
                                                                               LOB_CD) =
                                                                               'WORKERSCOMPLINE')
                                                             AND NOT EXISTS
                                                                        (SELECT EF1.LOSS_EVNT_GID
                                                                           FROM EXPOSURE_ALL_FIN_SNAP_FACT_VW EF1
                                                                          WHERE     EXPSR_PK_ID <>
                                                                                       -2
                                                                                AND EF1.LOSS_EVNT_GID =
                                                                                       EF2.LOSS_EVNT_GID))
                                               WHERE RNK = 1) EF) EF_UNION
                                  LEFT OUTER JOIN
                                     BODY_PART_DIM BP
                                  ON BP.INCID_GID = EF_UNION.INCID_GID --AND BP.PRIM_BODY_PART_INJ_IND = 'Y'  -- 9859, 5289, 6640
                                                                      ) A,
                          (SELECT LE.LOSS_EVNT_GID,
                                  LE.FNOL_CALL_COMPL_IND,
                                  LE.LOSS_RPRT_DT,
                                  LE.LOSS_TIME_IND,
                                  LE.LOSS_LOC_ST_ABBR,
                                  LE.LOSS_EVNT_NUM,
                                  LE.EE_RTRN_TO_WORK_IND,
                                  LE.LOSS_RPRT_METH_CD,
                                  LE.LOSS_RPRT_METH_DESC,
                                  LE.ACCID_ON_PREMIS_IND,
                                  LE.EQUIP_INVOLV_IN_ACCID_IND,
                                  LE.THIRD_PRTY_INVOLV_IND,
                                  LE.MACH_DEFCT_IND,
                                  LE.INCID_ONLY_CLM_IND,
                                  LE.CLMNT_RCV_TREAT_IND,
                                  LE.FNOL_EMERG_TRANS_TYP_CD,
                                  LE.FNOL_EMERG_TRANS_TYP_DESC,
                                  LE.CLMNT_ADMIT_TO_HOSP_IND,
                                  LE.FUT_MED_TREATS_EXPCT_IND,
                                  LE.QUES_INJ_IND,
                                  LE.NCCI_INJ_CAUSE_CD,
                                  LE.NCCI_INJ_CAUSE_DESC,
                                  LE.ACCID_RPT_TO_INSD_DT,
                                  LE.INIT_TREAT_DESC,
                                  LE.CLM_RPRT_BY_CD,
                                  LE.CLM_RPRT_BY_DESC,
                                  LE.LOSS_CS_CD,
                                  LE.LOSS_CS_DESC,
                                  LE.LOSS_DT,
                                  LE.CLM_SEG_CD,
                                  LE.CLM_SEG_DESC,
                                  LE.ACTL_DAYS_LOST_UNTL_FNOL_NUM,
                                  RANK ()
                                  OVER (PARTITION BY LOSS_EVNT_GID
                                        ORDER BY LOSS_EVNT_PK_ID)
                                     RNK
                             FROM LOSS_EVENT_DIM LE
                            WHERE     LE.DEL_IND = 'N'
                                  AND UPPER (LE.LOSS_EVNT_STTS_CD) <> 'DRAFT'
                                  AND LE.CLM_CNTR_CONV_IND = 'N') LE,
                          (SELECT CLM.CLM_GID,
                                  CLM.CLM_PK_ID,
                                  CLM.CLM_ID,
                                  RANK ()
                                  OVER (PARTITION BY CLM_GID
                                        ORDER BY CLM_PK_ID)
                                     RNK
                             FROM CLAIM_DIM CLM
                            WHERE CLM.DEL_IND = 'N') CLM,
                          (SELECT CLMNT.CLMNT_DOB,
                                  CLMNT.CLMNT_PK_ID,
                                  CLMNT.CLMNT_GID,
                                  RANK ()
                                  OVER (PARTITION BY CLMNT_GID
                                        ORDER BY CLMNT_PK_ID)
                                     RNK
                             FROM CLAIMANT_DIM CLMNT
                            WHERE CLMNT.DEL_IND = 'N') CLMNT,
                          (SELECT EMP.EMPLY_GID,
                                  EMP.EMPLY_PK_ID,
                                  EMP.FNOL_EST_RTW_DT,
                                  EMP.EE_RTW_DT,
                                  EMP.OFFR_OWNR_PRTNR_IND,
                                  EMP.EE_WORK_DUTY_TYP_CD,
                                  EMP.EE_WORK_DUTY_TYP_DESC,
                                  EMP.FIRST_LOST_WORK_DAY_DT,
                                  EMP.LAST_WORK_DAY_DT,
                                  EMP.WC_EE_TYP_CD,
                                  EMP.WC_EE_TYP_DESC,
                                  RANK ()
                                  OVER (PARTITION BY EMPLY_GID
                                        ORDER BY EMPLY_PK_ID)
                                     RNK
                             FROM EMPLOYMENT_DIM EMP
                            WHERE EMP.DEL_IND = 'N') EMP,
                          (SELECT LOB.LOB_PK_ID,
                                  LOB.LOB_GID,
                                  LOB.LOB_CD,
                                  LOB.LOB_DESC,
                                  RANK ()
                                  OVER (PARTITION BY LOB_GID
                                        ORDER BY LOB_PK_ID)
                                     RNK
                             FROM LINE_OF_BUSINESS_DIM LOB
                            WHERE LOB.DEL_IND = 'N') LOB,
                          (SELECT AC.ACCT_GID,
                                  AC.ACCT_PK_ID,
                                  AC.ACCT_NUM,
                                  AC.ACCT_NM,
                                  RANK ()
                                  OVER (PARTITION BY ACCT_GID
                                        ORDER BY ACCT_PK_ID)
                                     RNK
                             FROM ACCOUNT_DIM AC
                            WHERE AC.DEL_IND = 'N') AC,
                          (SELECT LP.LOSS_POL_PK_ID,
                                  LP.LOSS_POL_GID,
                                  LP.INSD_LOC_RPT_CD,
                                  LP.CLM_PLUS_IND,
                                  LP.POL_ID,
                                  RANK ()
                                  OVER (PARTITION BY LOSS_POL_GID
                                        ORDER BY LOSS_POL_PK_ID)
                                     RNK
                             FROM LOSS_POLICY_DIM LP
                            WHERE LP.DEL_IND = 'N') LP
                    WHERE     A.RNK = 1
                          AND A.LOSS_EVNT_GID = LE.LOSS_EVNT_GID
                          AND LE.RNK = 1
                          AND A.CLM_GID = CLM.CLM_GID
                          AND CLM.RNK = 1
                          AND A.CLMNT_GID = CLMNT.CLMNT_GID
                          AND CLMNT.RNK = 1
                          AND A.EMPLY_GID = EMP.EMPLY_GID(+)
                          AND EMP.RNK(+) = 1
                          AND A.LOB_PK_ID = LOB.LOB_PK_ID
                          AND LOB.RNK = 1
                          AND A.ACCT_GID = AC.ACCT_GID(+)
                          AND AC.RNK(+) = 1
                          AND A.LOSS_POL_GID = LP.LOSS_POL_GID(+)
                          AND LP.RNK(+) = 1))
    WHERE RNK1 = 1;