create or replace TYPE DSB_CUST_PKG_CUST_ROW AS OBJECT (
CUST_ID VARCHAR2(20),
EBID VARCHAR2(20),
FULL_NAME VARCHAR2(500),
TITLE VARCHAR2(5),
SEX VARCHAR2(1),
DOB DATE,
MOB_NUMBER VARCHAR2(20),
MOB_COUNTRY_CODE VARCHAR2(20),
MOB_AREA_CODE VARCHAR2(20),
OPT_IN VARCHAR2(20),
PERM_EMAIL VARCHAR2(50),
TEMP_EMAIL VARCHAR2(50),
PERM_EMAIL_LAST_UPDATE_DATE DATE,
PERM_EMAIL_LAST_UPDATE_BY VARCHAR2(50),
SKIP_EMAIL_UPDATE_PROCESS VARCHAR2(1),
EBANK_TYPE VARCHAR2(2),
STAFF_INDICATOR VARCHAR2(1),
FIRST_REGISTRATION_DATE DATE,
RE_REGISTRATION_DATE DATE,
LAST_LOGIN_SUCCESSFUL_DATE DATE,
LOGIN_FAIL_COUNT NUMBER,
LAST_LOGIN_FAIL_DATE DATE,
BIOMETRIC_REMINDER_FLAG VARCHAR2(1),
BIOMETRIC_REMINDER_DATE DATE,
STATUS VARCHAR2(20)
);
/
show errors
create or replace TYPE DSB_CUST_PKG_CUST_TAB AS TABLE OF DSB_DEV.DSB_CUST_PKG_CUST_ROW;
/
show errors
create or replace PACKAGE dsb_cust_pkg
AS
PROCEDURE get_cust
                  (
                      in_ebid IN VARCHAR
                    , out_cust_tab OUT DSB_CUST_PKG_CUST_TAB
                  );
END dsb_cust_pkg;
/
show errors
CREATE OR REPLACE PACKAGE BODY dsb_cust_pkg AS -- body

    PROCEDURE get_cust (
        in_ebid        IN VARCHAR,
        out_cust_tab   OUT dsb_cust_pkg_cust_tab
    ) IS

        CURSOR cur_cust (
            in_ebid VARCHAR
        ) IS SELECT
                 cust_id,
                 ebid,
                 full_name,
                 title,
                 sex,
                 dob,
                 mob_number,
                 mob_country_code,
                 mob_area_code,
                 opt_in,
                 perm_email,
                 temp_email,
                 perm_email_last_update_date,
                 perm_email_last_update_by,
                 skip_email_update_process,
                 ebank_type,
                 staff_indicator,
                 first_registration_date,
                 re_registration_date,
                 last_login_successful_date,
                 login_fail_count,
                 last_login_fail_date,
                 biometric_reminder_flag,
                 biometric_reminder_date,
                 status
             FROM
                 customer
             WHERE
                 customer.ebid = in_ebid;

        cur_cust_row   cur_cust%rowtype;
        cust_row       dsb_cust_pkg_cust_row;
    BEGIN
        out_cust_tab := dsb_cust_pkg_cust_tab ();
        OPEN cur_cust(in_ebid);
        LOOP
            FETCH cur_cust INTO cur_cust_row;
            EXIT WHEN cur_cust%notfound;
            BEGIN
                out_cust_tab.extend;
                cust_row := dsb_cust_pkg_cust_row(NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL
               ,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);

                cust_row.cust_id := cur_cust_row.cust_id;
                cust_row.ebid := cur_cust_row.ebid;
                cust_row.full_name := cur_cust_row.full_name;
                cust_row.title := cur_cust_row.title;
                cust_row.sex := cur_cust_row.sex;
                cust_row.dob := cur_cust_row.dob;
                cust_row.mob_number := cur_cust_row.mob_number;
                cust_row.mob_country_code := cur_cust_row.mob_country_code;
                cust_row.mob_area_code := cur_cust_row.mob_area_code;
                cust_row.opt_in := cur_cust_row.opt_in;
                cust_row.perm_email := cur_cust_row.perm_email;
                cust_row.temp_email := cur_cust_row.temp_email;
                cust_row.perm_email_last_update_date := cur_cust_row.perm_email_last_update_date;
                cust_row.perm_email_last_update_by := cur_cust_row.perm_email_last_update_by;
                cust_row.skip_email_update_process := cur_cust_row.skip_email_update_process;
                cust_row.ebank_type := cur_cust_row.ebank_type;
                cust_row.staff_indicator := cur_cust_row.staff_indicator;
                cust_row.first_registration_date := cur_cust_row.first_registration_date;
                cust_row.re_registration_date := cur_cust_row.re_registration_date;
                cust_row.last_login_successful_date := cur_cust_row.last_login_successful_date;
                cust_row.login_fail_count := cur_cust_row.login_fail_count;
                cust_row.last_login_fail_date := cur_cust_row.last_login_fail_date;
                cust_row.biometric_reminder_flag := cur_cust_row.biometric_reminder_flag;
                cust_row.biometric_reminder_date := cur_cust_row.biometric_reminder_date;
                cust_row.status := cur_cust_row.status;
                out_cust_tab(out_cust_tab.last) := cust_row;
            END;

        END LOOP;

        CLOSE cur_cust;
--        dbms_output.put_line('OUT_CUST_TAB = '
--                               || out_cust_tab(out_cust_tab.last).cust_id);
    END get_cust;

END dsb_cust_pkg;
/
show errors