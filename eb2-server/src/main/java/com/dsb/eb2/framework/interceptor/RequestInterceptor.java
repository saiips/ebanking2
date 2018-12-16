package com.dsb.eb2.framework.interceptor;

import java.util.Enumeration;
import java.util.Map;

import javax.servlet.DispatcherType;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.dsb.eb2.api.model.Customer;
import com.dsb.eb2.api.services.CustomerProfile;
import com.dsb.eb2.framework.controller.ApiController;
import com.dsb.eb2.framework.controller.BaseController;
import com.dsb.eb2.framework.controller.BaseObject;
import com.dsb.eb2.framework.controller.RequestCorrelation;

@Component("requestInterceptor")
public class RequestInterceptor extends HandlerInterceptorAdapter {

	private final Log logger = LogFactory.getLog(this.getClass());
	
	@Autowired
	private CustomerProfile customerProfile;	

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		logger.info("**********preHandle() start execution**********");
		String requestURI = request.getRequestURI();
		
//		boolean isRefreshTokenRequired = (boolean) request.getAttribute(ApiController.IS_REFRESH_TOKEN_REQUIRED);
//		logger.info(ApiController.IS_REFRESH_TOKEN_REQUIRED + " is " + isRefreshTokenRequired);
//		if (isRefreshTokenRequired) {
//			response.sendError(HttpServletResponse.SC_FORBIDDEN,"用户登录验证不正确");
//			return false;
//		}
		

		// Request Headers
		logHeader(request);
		
		// Example: Get Request Parameter
		// int custId = ServletRequestUtils.getIntParameter(request, "id",0);
		
		// Example: Get ParmaterMap
		Map parameters = request.getParameterMap();
		
		// Example : Get Path Variable
		// Map pathVariables = (Map) request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
		
		// String id= (String) pathVariables.get("id");
		// logger.info("id::" + id);
		
		
		
		/*
		// Base Annotation
		HandlerMethod handlerMethod = (HandlerMethod) handler;
		if (handlerMethod.getMethod().isAnnotationPresent(Base.class)) {
			System.out.println("Base.class here");
			final Base baseAnnotation = handlerMethod.getMethodAnnotation(Base.class);
			
			Customer customer = new Customer();
			
			CustTabItem custTabItem = new CustTabItem();
			custTabItem.setFullName("TESTER");
			
			CustTab custTab = new CustTab();
			custTab.setCustTabItem(custTabItem);
			customer.setCustTab(custTab);
			
			baseAnnotation.value(); 
			
		}
		*/
		
		// BaseController
		HandlerMethod handlerMethod = (HandlerMethod) handler;
		Object handlerBean = handlerMethod.getBean();
		if (handlerBean instanceof BaseController) {
			
			BaseObject baseObject = new BaseObject();
			
			// Call Customer Profile
			Customer customer = customerProfile.getCustomerTest(Integer.parseInt("1"));
			
			baseObject.setCustomer(customer);
			
			((BaseController) handlerBean).setBaseObject(baseObject);
		}

		
		logger.info("RequestURI::" + requestURI);
		logger.info("Requet CorrelationID::" + RequestCorrelation.getId());
		logger.info("**********preHandle() finisehd execution**********");
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object object, ModelAndView model)
			throws Exception {
		logger.info("**********postHandle() start execution**********");
		logger.info("In postHandle request processing " + "completed by @RestController");
		logger.info("**********postHandle() finished execution**********");
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object object, Exception arg3)
			throws Exception {
		logger.info("**********afterCompletion() start execution**********");
		logger.info("In afterCompletion Request Completed");
		logger.info("**********afterCompletion() finished execution**********");
	}
	
    private void logHeader(HttpServletRequest request) {
    	if (logger.isDebugEnabled()) {
			Enumeration<String> headerNames = request.getHeaderNames();
			while (headerNames.hasMoreElements()) {
				String headerName = headerNames.nextElement();
				logger.debug(headerName + " : " + request.getHeader(headerName));
			}
    	}
    }	
	
	private boolean currentRequestIsAsyncDispatcher(HttpServletRequest request) {
		return request.getDispatcherType().equals(DispatcherType.ASYNC);
	}

}
