package com.dsb.eb2.api.services;

import java.io.IOException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.dsb.eb2.framework.controller.ApiGateway;
import com.dsb.eb2.framework.util.WebAppProperties;
import com.dsb.eb2.model.Customer;
import com.dsb.eb2.model.Customer2;

@Component
public class CustomerProfile extends ApiGateway {
	
	private final Log logger = LogFactory.getLog(this.getClass());
	
	@Autowired
	private WebAppProperties webapp;
	
	
	public Customer getCustomer(int id) throws IOException, Exception {
		
		String url = webapp.getUrl() + "/CustomerService/GetCustomer?id=" + id;
		
		Customer customer = (Customer) super.getObject(url, "", Customer.class);
		
		return customer;
	}
	
	public Customer2 getCustomerTest(int id) throws IOException, Exception {
		
		// String url = webapp.getUrl() + "/CustomerService/GetCustomer?id=" + id;
		
		// Customer customer = (Customer) super.getObjectTest(url, "", Customer.class);
		
		// serviceURL = "https://httpbin.org/get";
		
		Customer2 customer = (Customer2) super.doRequestTest(null, null, null, null, null, null, null, null, Customer2.class);
		
		return customer;
	}
	
	public String test() throws Exception {
		
		String serviceURL = webapp.getUrl() + "/CustomerService/GetCustomer?id=1";
		
		String x = (String) super.doRequest("SESSION", "GET", "USER_PROFILE", "Y", "123456ABCDE", serviceURL, "GET", "", String.class);
		
		return x;
		// logger.info("customer=" + customer);
	}
	
}
