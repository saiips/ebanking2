package com.dsb.eb2.framework.controller;

import java.io.IOException;
import java.util.Map;

import javax.persistence.NoResultException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.dsb.eb2.api.model.Customer;
import com.dsb.eb2.api.services.CustomerProfile;
import com.dsb.eb2.framework.log.Loggable;

import lombok.Getter;
import lombok.Setter;

@Loggable
@Getter @Setter
public class BaseController {
	
	@Autowired
	private CustomerProfile customerProfile;
	
	private BaseObject baseObject;
	
	public BaseObject getBaseObjectTest(int id) throws IOException, Exception {
		
		BaseObject baseObject = new BaseObject();
		
		/*
		Customer customer = new Customer();
		
		CustTabItem custTabItem = new CustTabItem();
		custTabItem.setFullName("TESTER");
		
		CustTab custTab = new CustTab();
		custTab.setCustTabItem(custTabItem);
		customer.setCustTab(custTab);
		*/
		
		Customer customer = customerProfile.getCustomerTest(id);
		
		baseObject.setCustomer(customer);
		
		return baseObject;
	}
	
	@ExceptionHandler(NoResultException.class)
    public ResponseEntity<Map<String, Object>> handleNoResultException(NoResultException noResultException, HttpServletRequest request) {

        ExceptionAttributes exceptionAttributes = new DefaultExceptionAttributes();

        Map<String, Object> responseBody = exceptionAttributes.getExceptionAttributes(noResultException, request, HttpStatus.NOT_FOUND);

        return new ResponseEntity<Map<String, Object>>(responseBody, HttpStatus.NOT_FOUND);
    }
	
}
