package com.dsb.eb2.api.rest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.logging.LogLevel;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.dsb.eb2.api.model.Customer;
import com.dsb.eb2.api.model.Customer2;
import com.dsb.eb2.api.services.CustomerProfile;
import com.dsb.eb2.framework.controller.ApiController;
import com.dsb.eb2.framework.controller.Base;
import com.dsb.eb2.framework.controller.BaseController;
import com.dsb.eb2.framework.controller.BaseObject;
import com.dsb.eb2.framework.log.Loggable;

@RestController
@RequestMapping(ApiController.API_PATH)
@Loggable
public class CustomerController extends BaseController {
	
	private final Log logger = LogFactory.getLog(this.getClass());
	
	@Autowired
	private CustomerProfile customerProfile;
	
	@RequestMapping(value = "/v1/customer/{id}", method = RequestMethod.GET, produces="application/json")
	@ResponseBody
	@Loggable(result = false, value = LogLevel.INFO)
	@Base(value=BaseObject.class)
	public Object getCustomerOld(@PathVariable("id") int id) throws Exception {
		
		BaseObject baseObject = this.getBaseObject();
		//BaseObject baseObject = this.getBaseObjectTest(id);
		
		Customer customer = baseObject.getCustomer();
		
		// Customer customer = customerProfile.getCustomerTest(id);
		
		return customer.getCustTab().getCustTabItem();
	}	
	
	@RequestMapping(value = "/customer2/{id}", method = RequestMethod.GET, produces="application/json")
	@ResponseBody
	@Loggable(result = false, value = LogLevel.INFO)
	public Object getCustomer(@PathVariable("id") int id) throws Exception {
		//logger.info("getCustomer by id:" + id);
		
		Customer2 customer = customerProfile.getCustomer2(id);
		
		return customer;
	}
	
}
