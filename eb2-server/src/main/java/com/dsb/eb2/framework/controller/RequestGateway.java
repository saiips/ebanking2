package com.dsb.eb2.framework.controller;

import java.io.Serializable;

public class RequestGateway implements Serializable {

	private static final long serialVersionUID = -3320043882611437083L;
	
	private GatewayRequest gatewayRequest;
	
	public GatewayRequest getGatewayRequest() {
		return gatewayRequest;
	}

	public void setGatewayRequest(GatewayRequest gatewayRequest) {
		this.gatewayRequest = gatewayRequest;
	}


	public static class GatewayRequest {
		
		private String reqID;
		private String type;
		private String operation;
		private String dataType;
		private String coherenceRequired;
		private String coherenceID;
		private String serviceURL;
		private String serviceMethod;
		private String requestPayload;
		
		public String getReqID() {
			return reqID;
		}
		public void setReqID(String reqID) {
			this.reqID = reqID;
		}
		public String getType() {
			return type;
		}
		public void setType(String type) {
			this.type = type;
		}
		public String getOperation() {
			return operation;
		}
		public void setOperation(String operation) {
			this.operation = operation;
		}
		public String getDataType() {
			return dataType;
		}
		public void setDataType(String dataType) {
			this.dataType = dataType;
		}
		public String getCoherenceRequired() {
			return coherenceRequired;
		}
		public void setCoherenceRequired(String coherenceRequired) {
			this.coherenceRequired = coherenceRequired;
		}
		public String getCoherenceID() {
			return coherenceID;
		}
		public void setCoherenceID(String coherenceID) {
			this.coherenceID = coherenceID;
		}
		public String getServiceURL() {
			return serviceURL;
		}
		public void setServiceURL(String serviceURL) {
			this.serviceURL = serviceURL;
		}
		public String getServiceMethod() {
			return serviceMethod;
		}
		public void setServiceMethod(String serviceMethod) {
			this.serviceMethod = serviceMethod;
		}
		public String getRequestPayload() {
			return requestPayload;
		}
		public void setRequestPayload(String requestPayload) {
			this.requestPayload = requestPayload;
		}
		
		
	}
}
