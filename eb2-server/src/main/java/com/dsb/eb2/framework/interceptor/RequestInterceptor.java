package com.dsb.eb2.framework.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

@Component
public class RequestInterceptor extends HandlerInterceptorAdapter {
	
	private final Log logger = LogFactory.getLog(this.getClass());

	 @Override
	 public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object object) throws Exception {
		 
		logger.info("[RequestInterceptor] preHandle");
		String requestURI = request.getRequestURI();
		// Integer personId = ServletRequestUtils.getIntParameter(request, "personId", 0);
		logger.info("RequestURI::" + requestURI);
		logger.info("____________________________________________");
		return true;
	 }

	 @Override
	 public void postHandle(HttpServletRequest request, HttpServletResponse response, Object object, ModelAndView model) throws Exception {
		logger.info("_________________________________________");
		logger.info("In postHandle request processing " + "completed by @RestController");
		logger.info("_________________________________________");
	 }

	 @Override
	 public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object object, Exception arg3) throws Exception {
		logger.info("________________________________________");
		logger.info("In afterCompletion Request Completed");
		logger.info("________________________________________");
	 }
	 
}
