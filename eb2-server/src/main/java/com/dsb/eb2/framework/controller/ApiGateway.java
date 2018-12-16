package com.dsb.eb2.framework.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.logging.LogLevel;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

import com.dsb.eb2.framework.log.Loggable;
import com.dsb.eb2.framework.util.WebAppProperties;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Loggable
public class ApiGateway {
	
	// private final Log logger = LogFactory.getLog(this.getClass());
	
	@Autowired
	private WebAppProperties webAppProperties;
	
	
	@Loggable(result = false, value = LogLevel.INFO)
	public <T> Object doCoherenceRequest(String type, String operation, String dataType, String serviceUrl, String serviceMethod, String requestPayload, Class<T> responseClass) throws IOException, Exception {
		
		String coherenceID = "";
		
		return doRequest(type, operation, dataType, "Y", coherenceID, serviceUrl, serviceMethod, requestPayload, responseClass);
	}
	
	@Loggable(result = false, value = LogLevel.INFO)
	public <T> Object doRequest(String type, String operation, String dataType, String coherenceRequired, String coherenceID, String serviceURL, String serviceMethod, String requestPayload, Class<T> responseClass) throws IOException, Exception {
		
		RestTemplate restTemplate = new RestTemplate();
		restTemplate.setRequestFactory(clientHttpRequestFactory());
		
	    RequestGateway requestGateway = constructGatewayRequest(type, operation, dataType, coherenceRequired, coherenceID, serviceURL, serviceMethod, requestPayload);
	    HttpEntity<RequestGateway> request = new HttpEntity<>(requestGateway);
		ResponseEntity<String> response  = restTemplate.exchange(serviceURL, HttpMethod.GET, request, String.class);
		
		T object = constructGatewayResponse(response.getBody(), responseClass);
		
		return object;
	}
	
	@Loggable(result = false, value = LogLevel.INFO)
	public <T> Object doRequestTest(String type, String operation, String dataType, String coherenceRequired, String coherenceID, String serviceURL, String serviceMethod, String requestPayload, Class<T> responseClass) throws IOException, Exception {
		
		byte[] result = Files.readAllBytes(Paths.get("c:\\temp", "test2.json"));
		
		T object = constructGatewayResponse(result, responseClass);
		
		return object;
	}	
	

	
	@Loggable(result = false, value = LogLevel.INFO)
	public <T> Object getObject(String url, String requestPayload, Class<T> responseClass) throws IOException, Exception { 
		RestTemplate restTemplate = new RestTemplate();
		restTemplate.setRequestFactory(clientHttpRequestFactory());
		
		String result = restTemplate.getForObject(url, String.class);
		
		// Alternatives 1:
		/* 
		JsonNode rootNode = objectMapper.readTree(result);
		JsonNode tabNode = rootNode.path("OUT_CUST_TAB");
		JsonNode itemNode = tabNode.path("OUT_CUST_TAB_ITEM");
		
		ObjectMapper mapper = new ObjectMapper();
		T object = mapper.readValue(itemNode.toString(), responseClass);
		*/
		
		// Alternatives 2:
		/*
		Gson gson = new Gson();
		T object = gson.fromJson(result,responseClass);
		*/

		// Alternatives 3:
		ObjectMapper objectMapper = new ObjectMapper();
		T object = objectMapper.readValue(result, responseClass);

		
		return object;
	}
	
	@Loggable(result = false, value = LogLevel.INFO)
	public <T> Object getObjectTest(String url, String requestPayload, Class<T> responseClass) throws IOException, Exception {
		
		byte[] result = Files.readAllBytes(Paths.get("c:\\temp", "test.json"));
		
		ObjectMapper objectMapper = new ObjectMapper();
		T object = objectMapper.readValue(result, responseClass);
		
		
		return object;
	}		
	
	private ClientHttpRequestFactory clientHttpRequestFactory() {
	    HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
	    factory.setReadTimeout(Integer.valueOf(webAppProperties.getReadTimeout()));
	    factory.setConnectTimeout(Integer.valueOf(webAppProperties.getConnectionTimeout()));
	    return factory;
	}		
	
	private RequestGateway constructGatewayRequest(String type, String operation, String dataType, String coherenceRequired, String coherenceID, String serviceURL, String serviceMethod, String requestPayload) {

		RequestGateway requestGateway = new RequestGateway();
		RequestGateway.GatewayRequest gatewayRequest = new RequestGateway.GatewayRequest();
		
		gatewayRequest.setReqID(RequestCorrelation.getId());
		gatewayRequest.setType(type);
		gatewayRequest.setOperation(operation);
		gatewayRequest.setDataType(dataType);
		gatewayRequest.setCoherenceRequired(coherenceRequired);
		gatewayRequest.setCoherenceID(coherenceID);
		gatewayRequest.setServiceURL(serviceURL);
		gatewayRequest.setServiceMethod(serviceMethod);
		gatewayRequest.setRequestPayload(requestPayload);
		
		requestGateway.setGatewayRequest(gatewayRequest);
		
		return requestGateway;
	}
	
	private <T> T constructGatewayResponse(final byte[] result, final Class<T> responseClass) throws IOException {

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode rootNode = objectMapper.readTree(result);
		JsonNode output = rootNode.path("output");
		
//		JsonNode gatewayResponse = rootNode.path("gatewayResponse");
//		JsonNode responsePayload = gatewayResponse.path("responsePayload");
//		JsonNode output = responsePayload.path("output");
		
		ObjectMapper mapper = new ObjectMapper();
		T object = mapper.readValue(output.toString(), responseClass);		
		
		return object;
	}		
	
	private <T> T constructGatewayResponse(final String result, final Class<T> responseClass) throws IOException {

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode rootNode = objectMapper.readTree(result);
		JsonNode output = rootNode.path("output");
//		JsonNode gatewayResponse = rootNode.path("gatewayResponse");
//		JsonNode responsePayload = gatewayResponse.path("responsePayload");
//		JsonNode output = responsePayload.path("output");
		
		ObjectMapper mapper = new ObjectMapper();
		T object = mapper.readValue(output.toString(), responseClass);		
		
		return object;
	}			
	
	
}
