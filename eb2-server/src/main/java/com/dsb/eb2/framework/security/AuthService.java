package com.dsb.eb2.framework.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;

public interface AuthService {
	public HttpHeaders login(HttpServletRequest request, HttpServletResponse response, String username, String pinblock);
	public HttpHeaders refresh(HttpServletRequest request, HttpServletResponse response, String header);
	public String validate(HttpServletRequest request, HttpServletResponse response, String token);
	public String extractToken(String header);
}
