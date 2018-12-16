package com.dsb.eb2.sso.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.logging.LogLevel;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.dsb.eb2.framework.controller.ApiController;
import com.dsb.eb2.framework.controller.BaseController;
import com.dsb.eb2.framework.log.Loggable;
import com.dsb.eb2.framework.security.AuthService;
import com.dsb.eb2.framework.security.exceptions.InvalidJwtToken;
import com.dsb.eb2.framework.security.exceptions.JwtExpiredTokenException;

@RestController
@RequestMapping(ApiController.SSO_PATH)
@Loggable
public class LoginController extends BaseController {
	
	private final Log logger = LogFactory.getLog(this.getClass());
	
    @Autowired
    private AuthService authService;
    
    @SuppressWarnings({ "unchecked"})
	@CrossOrigin(origins = "*")
	@RequestMapping(value="/user/authenticate", method = RequestMethod.POST)
    @Loggable(result = false, value = LogLevel.INFO)
    public ResponseEntity<Map<String, Object>> authenticate(HttpServletRequest request, HttpServletResponse response, @RequestBody Map<String, Object> payload) {
    	// request payload  
        String username = payload.get(ApiController.USERNAME).toString();
        String password = payload.get(ApiController.PASSWORD).toString();
        String pinblock = payload.get(ApiController.PINBLOCK).toString();
        
        HttpHeaders headers = authService.login(request, response, username, pinblock);

	    return (new ResponseEntity<Map<String, Object>>(null, headers, HttpStatus.OK));
    }    
    
    
   
    @CrossOrigin(origins = "*")
	@RequestMapping(value="/token/refresh", method = RequestMethod.POST)
    @Loggable(result = false, value = LogLevel.INFO)    
    public ResponseEntity<Map<String, Object>> refresh(HttpServletRequest request, HttpServletResponse response, @RequestHeader Map<String, Object> headerMap) throws ParseException {
    	
    	String header = headerMap.get(ApiController.REFRESH_AUTHORIZATION.toLowerCase()).toString();
		
    	HttpHeaders headers = authService.refresh(request, response, header);
		
    	return (new ResponseEntity<Map<String, Object>>(null, headers, HttpStatus.OK));
    }
    
    
    @CrossOrigin(origins = "*")
	@RequestMapping(value="/token/validate", method = RequestMethod.POST)
    @Loggable(result = false, value = LogLevel.INFO)    
    public ResponseEntity<Map<String, Object>> validate(HttpServletRequest request, HttpServletResponse response, @RequestHeader Map<String, Object> headers) {
    	Map<String, Object> json = null;
    	
        try {
        	String header = headers.get(ApiController.AUTHORIZATION.toLowerCase()).toString();
        	
        	String result = authService.validate(request, response, header);
        	
        	if ("E".equals(result)) {
        		 json = responseMsgValidate(401, new JwtExpiredTokenException("JWT is expired").getClass().getSimpleName(), "AUTHENTICATION_FAILED", ApiController.SSO_PATH + "/token/validate");
        		 return (new ResponseEntity<Map<String, Object>>(json, null, HttpStatus.UNAUTHORIZED));
        		
        	} else if ("I".equals(result)) {
        		 json = responseMsgValidate(401,  new InvalidJwtToken().getClass().getSimpleName(), "AUTHENTICATION_FAILED", ApiController.SSO_PATH + "/token/validate");
        		 return (new ResponseEntity<Map<String, Object>>(json, null, HttpStatus.UNAUTHORIZED));
        	}

        } catch (Exception ex) {
        	ex.printStackTrace();
        	return (new ResponseEntity<Map<String, Object>>(null, null, HttpStatus.UNAUTHORIZED));
        }    
        
        return (new ResponseEntity<Map<String, Object>>(null, null, HttpStatus.OK));
    }
    
    private Map<String, Object> responseMsgValidate(int status, String exptionClass, String message, String path) {
		Map<String, Object> json = new HashMap<String, Object>();
    	json.put("timestamp", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.US).format(new Date()));
		json.put("status", status);
		json.put("error", exptionClass);
	    json.put("message", message);
	    json.put("path", path);
	    
	    return json;
    }
    
}
