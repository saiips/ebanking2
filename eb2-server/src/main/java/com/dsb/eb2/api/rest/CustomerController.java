package com.dsb.eb2.api.rest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.dsb.eb2.api.services.CustomerProfile;
import com.dsb.eb2.framework.controller.ApiController;
import com.dsb.eb2.model.Customer;

@RestController
@RequestMapping(ApiController.API_PATH)
public class CustomerController extends ApiController {
	
	private final Log logger = LogFactory.getLog(this.getClass());
	
	@Autowired
	private CustomerProfile customerProfile;
	
	@RequestMapping(value = "/customer/{id}", method = RequestMethod.GET, produces="application/json")
	@ResponseBody
	public Customer getCustomer(@PathVariable("id") int id) throws Exception {
		logger.info("getCustomer by id:" + id);
		
		Customer customer = customerProfile.getCustomer(id);
		
		return customer;
	}
	
}
