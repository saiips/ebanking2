package com.dsb.eb2.framework.controller;

public abstract class ApiController {
    // resource path 
	public static final String API_PATH = "/api";
    public static final String SSO_PATH = "/sso";
    
    // response header
    public static final String X_AUTH_TOKEN = "X-AUTH-TOKEN";
    public static final String CONTENT_TYPE = "Content-Type";
    public static final String CONTENT_TYPE_APPL_JSON = "application/json; charset=UTF-8";
    public static final String AUTHORIZATION = "X-Authorization";
    public static final String REFRESH_AUTHORIZATION = "X-Refresh-Authorization";
    public static final String BEARER = "Bearer ";
    public static final String IS_REFRESH_TOKEN_REQUIRED = "isRefreshTokenRequired";
        
    // request fields
    public static final String USERNAME = "username";
    public static final String PASSWORD = "password";
    public static final String PINBLOCK = "pinblock";
    public static final String TGT = "TGT";
    public static final String JTI = "jti";
    
    // token status
    public static final String TOKEN_EXPIRED = "E";
    public static final String TOKEN_INVALID = "I";
    public static final String TOKEN_VALID = "V";
    



    public static final String AUTHENTICATE_URL = API_PATH + "/authenticate";
    public static final String STUFF_URL = API_PATH + "/stuff";

    // Spring Boot Actuator services
    public static final String AUTOCONFIG_ENDPOINT = "/autoconfig";
    public static final String BEANS_ENDPOINT = "/beans";
    public static final String CONFIGPROPS_ENDPOINT = "/configprops";
    public static final String ENV_ENDPOINT = "/env";
    public static final String MAPPINGS_ENDPOINT = "/mappings";
    public static final String METRICS_ENDPOINT = "/metrics";
    public static final String SHUTDOWN_ENDPOINT = "/shutdown";
    
}