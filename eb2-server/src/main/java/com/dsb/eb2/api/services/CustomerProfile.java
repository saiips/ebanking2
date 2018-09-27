package com.dsb.eb2.api.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.dsb.eb2.framework.util.WebAppProperties;
import com.dsb.eb2.model.Customer;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class CustomerProfile {
	
	private final Log logger = LogFactory.getLog(this.getClass());
	
	@Autowired
	private WebAppProperties webapp;
	
	
	public Customer getCustomer(int id) throws IOException, Exception {
		
		String url = webapp.getUrl() + "/CustomerService/GetCustomer?id=";
		logger.info("osb url=" + url);
		
		RestTemplate restTemplate = new RestTemplate();
		restTemplate.setRequestFactory(clientHttpRequestFactory());
		
		String result = restTemplate.getForObject(url + id, String.class);
		
		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode rootNode = objectMapper.readTree(result);
		JsonNode tabNode = rootNode.path("OUT_CUST_TAB");
		JsonNode itemNode = tabNode.path("OUT_CUST_TAB_ITEM");
		
		ObjectMapper mapper = new ObjectMapper();
		Customer customer = mapper.readValue(itemNode.toString(), Customer.class);		
		
		return customer;
	}
	
	public Customer getCustomerTest(int id) throws IOException, Exception {
		
		byte[] jsonData = Files.readAllBytes(Paths.get("c:\\temp", "test.json"));
		String str = new String(jsonData);
		logger.info("json=" + str);
		
		ObjectMapper objectMapper = new ObjectMapper();
		
		JsonNode rootNode = objectMapper.readTree(jsonData);
		JsonNode tabNode = rootNode.path("OUT_CUST_TAB");
		JsonNode itemNode = tabNode.path("OUT_CUST_TAB_ITEM");
		
		// alternative case 1:
		logger.info("itemNode=" + itemNode.toString());
		
		// alternative case 2: 
	    ObjectMapper mapper = new ObjectMapper();
		Customer customer = mapper.readValue(itemNode.toString(), Customer.class);
		logger.info("customer=" + customer.toString());	
		
		return customer;
	}
	
	
	private ClientHttpRequestFactory clientHttpRequestFactory() {
	    HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
	    factory.setReadTimeout(50000);
	    factory.setConnectTimeout(50000);
	    return factory;
	}		
}
