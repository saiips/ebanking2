package com.dsb.eb2.framework.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;

public interface  ExceptionAttributes {
	
    Map<String, Object> getExceptionAttributes(Exception exception,HttpServletRequest httpRequest, HttpStatus httpStatus);

}
