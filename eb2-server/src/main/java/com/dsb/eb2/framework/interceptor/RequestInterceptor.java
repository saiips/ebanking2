package com.dsb.eb2.framework.interceptor;

import java.util.Enumeration;
import java.util.UUID;

import javax.servlet.DispatcherType;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.dsb.eb2.framework.controller.RequestCorrelation;

@Component
public class RequestInterceptor extends HandlerInterceptorAdapter {

	private final Log logger = LogFactory.getLog(this.getClass());

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object object) throws Exception {
		logger.info("**********preHandle() start execution**********");
		String requestURI = request.getRequestURI();

		// Request Headers
		logHeader(request);

		// Example: Get Request Parameter
		// Integer personId = ServletRequestUtils.getIntParameter(request, "personId",0);
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
