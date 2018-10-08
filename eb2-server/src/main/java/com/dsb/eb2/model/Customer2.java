package com.dsb.eb2.model;

import java.io.Serializable;
import java.util.Date;

import com.dsb.eb2.framework.util.JsonPattern;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;


public class Customer2 implements Serializable {

	private static final long serialVersionUID = 8240491955072365574L;
	
	private int customerID;
    private int ebid;
    private String fullName;
    private String title;
    private String sex;
    private Date dob;
    private String mobileNo;
    private String mobileCountryCode;
    private String mobileAreaCode;
    private String optIn;
    private String permEmail;
	private String tempEmail;
    private Date lastUpdDateEmail;
    private String lastUpdByEmail;
    private String skipEmailUpdProcess;
    private String ebankType;
    private String staffInd;
    private Date frstRegDate;
    private Date reRegDate;
    private Date lstLogonSuccDate;
    private int loginFailCnt;
    private Date lastLoginFailDate;
    private String bioRemdrFlg;
    private Date bioRemdrDate;
    private String status;
    


    @JsonProperty("CUST_ID")
	public int getCustomerID() {
		return customerID;
	}

    @JsonProperty("CUST_ID")
	public void setCustomerID(int customerID) {
		this.customerID = customerID;
	}

    @JsonProperty("EBID")
	public int getEbid() {
		return ebid;
	}

    @JsonProperty("EBID")
	public void setEbid(int ebid) {
		this.ebid = ebid;
	}

    @JsonProperty("FULL_NAME")
	public String getFullName() {
		return fullName;
	}

    @JsonProperty("FULL_NAME")
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

    @JsonProperty("TITLE")
	public String getTitle() {
		return title;
	}

    @JsonProperty("TITLE")    
	public void setTitle(String title) {
		this.title = title;
	}

    @JsonProperty("SEX")     
	public String getSex() {
		return sex;
	}
    
    @JsonProperty("SEX")     
	public void setSex(String sex) {
		this.sex = sex;
	}

    @JsonProperty("DOB")  
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = JsonPattern.DATE_FORMAT_SHORT)
	public Date getDob() {
		return dob;
	}

    @JsonProperty("DOB")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = JsonPattern.DATE_FORMAT_LONG)
	public void setDob(Date dob) {
		this.dob = dob;
	}

    @JsonProperty("MOB_NUMBER")    
	public String getMobileNo() {
		return mobileNo;
	}

    @JsonProperty("MOB_NUMBER")
	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}
    
    @JsonProperty("MOB_COUNTRY_CODE")
    public String getMobileCountryCode() {
		return mobileCountryCode;
	}
    
    @JsonProperty("MOB_COUNTRY_CODE")
	public void setMobileCountryCode(String mobileCountryCode) {
		this.mobileCountryCode = mobileCountryCode;
	}

	@JsonProperty("MOB_AREA_CODE")
    public String getMobileAreaCode() {
		return mobileAreaCode;
	}

    @JsonProperty("MOB_AREA_CODE")
	public void setMobileAreaCode(String mobileAreaCode) {
		this.mobileAreaCode = mobileAreaCode;
	}    

    @JsonProperty("OPT_IN")
	public String getOptIn() {
		return optIn;
	}

    @JsonProperty("OPT_IN")
	public void setOptIn(String optIn) {
		this.optIn = optIn;
	}

    @JsonProperty("PERM_EMAIL")
	public String getPermEmail() {
		return permEmail;
	}

    @JsonProperty("PERM_EMAIL")
	public void setPermEmail(String permEmail) {
		this.permEmail = permEmail;
	}

    @JsonProperty("TEMP_EMAIL")
	public String getTempEmail() {
		return tempEmail;
	}

    @JsonProperty("TEMP_EMAIL")
	public void setTempEmail(String tempEmail) {
		this.tempEmail = tempEmail;
	}

    @JsonProperty("PERM_EMAIL_LAST_UPDATE_DATE")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = JsonPattern.DATE_FORMAT_LONG)
	public Date getLastUpdDateEmail() {
		return lastUpdDateEmail;
	}

    @JsonProperty("PERM_EMAIL_LAST_UPDATE_DATE")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = JsonPattern.DATE_FORMAT_LONG)
	public void setLastUpdDateEmail(Date lastUpdDateEmail) {
		this.lastUpdDateEmail = lastUpdDateEmail;
	}

    @JsonProperty("PERM_EMAIL_LAST_UPDATE_BY")
	public String getLastUpdByEmail() {
		return lastUpdByEmail;
	}

    @JsonProperty("PERM_EMAIL_LAST_UPDATE_BY")
	public void setLastUpdByEmail(String lastUpdByEmail) {
		this.lastUpdByEmail = lastUpdByEmail;
	}

    @JsonProperty("SKIP_EMAIL_UPDATE_PROCESS")
	public String getSkipEmailUpdProcess() {
		return skipEmailUpdProcess;
	}

    @JsonProperty("SKIP_EMAIL_UPDATE_PROCESS")
	public void setSkipEmailUpdProcess(String skipEmailUpdProcess) {
		this.skipEmailUpdProcess = skipEmailUpdProcess;
	}

    @JsonProperty("EBANK_TYPE")
	public String getEbankType() {
		return ebankType;
	}

    @JsonProperty("EBANK_TYPE")
	public void setEbankType(String ebankType) {
		this.ebankType = ebankType;
	}

    @JsonProperty("STAFF_INDICATOR")
	public String getStaffInd() {
		return staffInd;
	}

    @JsonProperty("STAFF_INDICATOR")
	public void setStaffInd(String staffInd) {
		this.staffInd = staffInd;
	}

    @JsonProperty("FIRST_REGISTRATION_DATE")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = JsonPattern.DATE_FORMAT_LONG)
	public Date getFrstRegDate() {
		return frstRegDate;
	}

    @JsonProperty("FIRST_REGISTRATION_DATE")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = JsonPattern.DATE_FORMAT_LONG)
	public void setFrstRegDate(Date frstRegDate) {
		this.frstRegDate = frstRegDate;
	}

    @JsonProperty("RE_REGISTRATION_DATE")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = JsonPattern.DATE_FORMAT_LONG)
	public Date getReRegDate() {
		return reRegDate;
	}

    @JsonProperty("RE_REGISTRATION_DATE")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = JsonPattern.DATE_FORMAT_LONG)
	public void setReRegDate(Date reRegDate) {
		this.reRegDate = reRegDate;
	}

    @JsonProperty("LAST_LOGIN_SUCCESSFUL_DATE")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = JsonPattern.DATE_FORMAT_LONG)
	public Date getLstLogonSuccDate() {
		return lstLogonSuccDate;
	}

    @JsonProperty("LAST_LOGIN_SUCCESSFUL_DATE")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = JsonPattern.DATE_FORMAT_LONG)
	public void setLstLogonSuccDate(Date lstLogonSuccDate) {
		this.lstLogonSuccDate = lstLogonSuccDate;
	}

    @JsonProperty("LOGIN_FAIL_COUNT")
	public int getLoginFailCnt() {
		return loginFailCnt;
	}

    @JsonProperty("LOGIN_FAIL_COUNT")
	public void setLoginFailCnt(int loginFailCnt) {
		this.loginFailCnt = loginFailCnt;
	}

    @JsonProperty("LAST_LOGIN_FAIL_DATE")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = JsonPattern.DATE_FORMAT_LONG)
	public Date getLastLoginFailDate() {
		return lastLoginFailDate;
	}

    @JsonProperty("LAST_LOGIN_FAIL_DATE")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = JsonPattern.DATE_FORMAT_LONG)
	public void setLastLoginFailDate(Date lastLoginFailDate) {
		this.lastLoginFailDate = lastLoginFailDate;
	}

    @JsonProperty("BIOMETRIC_REMINDER_FLAG")
	public String getBioRemdrFlg() {
		return bioRemdrFlg;
	}

    @JsonProperty("BIOMETRIC_REMINDER_FLAG")
	public void setBioRemdrFlg(String bioRemdrFlg) {
		this.bioRemdrFlg = bioRemdrFlg;
	}

    @JsonProperty("BIOMETRIC_REMINDER_DATE")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = JsonPattern.DATE_FORMAT_LONG)
	public Date getBioRemdrDate() {
		return bioRemdrDate;
	}

    @JsonProperty("BIOMETRIC_REMINDER_DATE")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = JsonPattern.DATE_FORMAT_LONG)
	public void setBioRemdrDate(Date bioRemdrDate) {
		this.bioRemdrDate = bioRemdrDate;
	}

    @JsonProperty("STATUS")
	public String getStatus() {
		return status;
	}

    @JsonProperty("STATUS")
	public void setStatus(String status) {
		this.status = status;
	}

    

}