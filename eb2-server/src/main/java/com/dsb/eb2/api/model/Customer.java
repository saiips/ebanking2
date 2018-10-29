package com.dsb.eb2.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Customer {

	@JsonProperty("OUT_CUST_TAB")
	private CustTab custTab;

	public CustTab getCustTab() {
		return custTab;
	}

	public void setCustTab(CustTab custTab) {
		this.custTab = custTab;
	}

	public static class CustTab {

		@JsonProperty("OUT_CUST_TAB_ITEM")
		private CustTabItem custTabItem;

		public CustTabItem getCustTabItem() {
			return custTabItem;
		}

		public void setCustTabItem(CustTabItem custTabItem) {
			this.custTabItem = custTabItem;
		}
	}

	public static class CustTabItem {

		@JsonProperty("CUST_ID")
		private int customerID;

		@JsonProperty("EBID")
		private int ebid;

		@JsonProperty("FULL_NAME")
		private String fullName;

		@JsonProperty("TITLE")
		private String title;

		@JsonProperty("SEX")
		private String sex;

		@JsonProperty("DOB")
		private String dob;

		@JsonProperty("MOB_NUMBER")
		private String mobileNo;

		@JsonProperty("MOB_COUNTRY_CODE")
		private String mobileCountryCode;

		@JsonProperty("MOB_AREA_CODE")
		private String mobileAreaCode;

		@JsonProperty("OPT_IN")
		private String optIn;

		@JsonProperty("PERM_EMAIL")
		private String permEmail;

		@JsonProperty("TEMP_EMAIL")
		private String tempEmail;

		@JsonProperty("PERM_EMAIL_LAST_UPDATE_DATE")
		private String lastUpdDateEmail;

		@JsonProperty("PERM_EMAIL_LAST_UPDATE_BY")
		private String lastUpdByEmail;

		@JsonProperty("SKIP_EMAIL_UPDATE_PROCESS")
		private String skipEmailUpdProcess;

		@JsonProperty("EBANK_TYPE")
		private String ebankType;

		@JsonProperty("STAFF_INDICATOR")
		private String staffInd;

		@JsonProperty("FIRST_REGISTRATION_DATE")
		private String frstRegDate;

		@JsonProperty("RE_REGISTRATION_DATE")
		private String reRegDate;

		@JsonProperty("LAST_LOGIN_SUCCESSFUL_DATE")
		private String lstLogonSuccDate;

		@JsonProperty("LOGIN_FAIL_COUNT")
		private int loginFailCnt;

		@JsonProperty("LAST_LOGIN_FAIL_DATE")
		private String lastLoginFailDate;

		@JsonProperty("BIOMETRIC_REMINDER_FLAG")
		private String bioRemdrFlg;

		@JsonProperty("BIOMETRIC_REMINDER_DATE")
		private String bioRemdrDate;

		@JsonProperty("STATUS")
		private String status;

		public int getCustomerID() {
			return customerID;
		}

		public void setCustomerID(int customerID) {
			this.customerID = customerID;
		}

		public int getEbid() {
			return ebid;
		}

		public void setEbid(int ebid) {
			this.ebid = ebid;
		}

		public String getFullName() {
			return fullName;
		}

		public void setFullName(String fullName) {
			this.fullName = fullName;
		}

		public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}

		public String getSex() {
			return sex;
		}

		public void setSex(String sex) {
			this.sex = sex;
		}

		public String getDob() {
			return dob;
		}

		public void setDob(String dob) {
			this.dob = dob;
		}

		public String getMobileNo() {
			return mobileNo;
		}

		public void setMobileNo(String mobileNo) {
			this.mobileNo = mobileNo;
		}

		public String getMobileCountryCode() {
			return mobileCountryCode;
		}

		public void setMobileCountryCode(String mobileCountryCode) {
			this.mobileCountryCode = mobileCountryCode;
		}

		public String getMobileAreaCode() {
			return mobileAreaCode;
		}

		public void setMobileAreaCode(String mobileAreaCode) {
			this.mobileAreaCode = mobileAreaCode;
		}

		public String getOptIn() {
			return optIn;
		}

		public void setOptIn(String optIn) {
			this.optIn = optIn;
		}

		public String getPermEmail() {
			return permEmail;
		}

		public void setPermEmail(String permEmail) {
			this.permEmail = permEmail;
		}

		public String getTempEmail() {
			return tempEmail;
		}

		public void setTempEmail(String tempEmail) {
			this.tempEmail = tempEmail;
		}

		public String getLastUpdDateEmail() {
			return lastUpdDateEmail;
		}

		public void setLastUpdDateEmail(String lastUpdDateEmail) {
			this.lastUpdDateEmail = lastUpdDateEmail;
		}

		public String getLastUpdByEmail() {
			return lastUpdByEmail;
		}

		public void setLastUpdByEmail(String lastUpdByEmail) {
			this.lastUpdByEmail = lastUpdByEmail;
		}

		public String getSkipEmailUpdProcess() {
			return skipEmailUpdProcess;
		}

		public void setSkipEmailUpdProcess(String skipEmailUpdProcess) {
			this.skipEmailUpdProcess = skipEmailUpdProcess;
		}

		public String getEbankType() {
			return ebankType;
		}

		public void setEbankType(String ebankType) {
			this.ebankType = ebankType;
		}

		public String getStaffInd() {
			return staffInd;
		}

		public void setStaffInd(String staffInd) {
			this.staffInd = staffInd;
		}

		public String getFrstRegDate() {
			return frstRegDate;
		}

		public void setFrstRegDate(String frstRegDate) {
			this.frstRegDate = frstRegDate;
		}

		public String getReRegDate() {
			return reRegDate;
		}

		public void setReRegDate(String reRegDate) {
			this.reRegDate = reRegDate;
		}

		public String getLstLogonSuccDate() {
			return lstLogonSuccDate;
		}

		public void setLstLogonSuccDate(String lstLogonSuccDate) {
			this.lstLogonSuccDate = lstLogonSuccDate;
		}

		public int getLoginFailCnt() {
			return loginFailCnt;
		}

		public void setLoginFailCnt(int loginFailCnt) {
			this.loginFailCnt = loginFailCnt;
		}

		public String getLastLoginFailDate() {
			return lastLoginFailDate;
		}

		public void setLastLoginFailDate(String lastLoginFailDate) {
			this.lastLoginFailDate = lastLoginFailDate;
		}

		public String getBioRemdrFlg() {
			return bioRemdrFlg;
		}

		public void setBioRemdrFlg(String bioRemdrFlg) {
			this.bioRemdrFlg = bioRemdrFlg;
		}

		public String getBioRemdrDate() {
			return bioRemdrDate;
		}

		public void setBioRemdrDate(String bioRemdrDate) {
			this.bioRemdrDate = bioRemdrDate;
		}

		public String getStatus() {
			return status;
		}

		public void setStatus(String status) {
			this.status = status;
		}
	}

}