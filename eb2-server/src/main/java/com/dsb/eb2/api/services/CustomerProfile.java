package com.dsb.eb2.api.services;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.logging.LogLevel;
import org.springframework.stereotype.Component;

import com.dsb.eb2.api.model.Customer;
import com.dsb.eb2.api.model.Customer2;
import com.dsb.eb2.framework.controller.ApiGateway;
import com.dsb.eb2.framework.log.Loggable;
import com.dsb.eb2.framework.util.WebAppProperties;

@Component
@Loggable
public class CustomerProfile extends ApiGateway {
	
	// private final Log logger = LogFactory.getLog(this.getClass());
	
	@Autowired
	private WebAppProperties webapp;
	
	@Loggable(result = false, value = LogLevel.INFO)
	public Customer getCustomer(int id) throws IOException, Exception {
		
		String url = webapp.getUrl() + "/CustomerService/GetCustomer?id=" + id;
		
		Customer customer = (Customer) super.getObject(url, "", Customer.class);
		
		return customer;
	}
	
	@Loggable(result = false, value = LogLevel.INFO)
	public Customer getCustomerTest(int id) throws IOException, Exception {
		
		String url = webapp.getUrl() + "/CustomerService/GetCustomer?id=" + id;
		
		Customer customer = (Customer) super.getObjectTest(url, "", Customer.class);
		
		return customer;
	}	
	
	@Loggable(result = false, value = LogLevel.INFO)
	public Customer2 getCustomer2Test(int id) throws IOException, Exception {
		
		Customer2 customer = (Customer2) super.doRequestTest(null, null, null, null, null, null, null, null, Customer2.class);
		
		return customer;
	}
	
	@Loggable(result = false, value = LogLevel.INFO)
	public Customer2 getCustomer2(int id) throws Exception {
		
		String serviceURL = webapp.getUrl() + "/CustomerService/GetCustomer?id=" + id;
		
		Customer2 customer = (Customer2) super.doRequest("SESSION", "GET", 
				"USER_PROFILE", "Y", 
				"123456ABCDE", serviceURL, "GET", "", Customer2.class);
		
		return customer;
	}
	
}
