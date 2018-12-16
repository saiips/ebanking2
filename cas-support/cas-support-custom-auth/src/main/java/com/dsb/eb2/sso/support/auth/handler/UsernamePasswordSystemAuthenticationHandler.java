package com.dsb.eb2.sso.support.auth.handler;

import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import javax.security.auth.login.FailedLoginException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apereo.cas.authentication.AuthenticationHandlerExecutionResult;
import org.apereo.cas.authentication.Credential;
import org.apereo.cas.authentication.MessageDescriptor;
import org.apereo.cas.authentication.PreventedException;
import org.apereo.cas.authentication.UsernamePasswordCredential;
import org.apereo.cas.authentication.handler.support.AbstractPreAndPostProcessingAuthenticationHandler;
import org.apereo.cas.authentication.principal.PrincipalFactory;
import org.apereo.cas.services.ServicesManager;

import com.dsb.eb2.sso.support.auth.UsernamePasswordSysCredential;


public class UsernamePasswordSystemAuthenticationHandler extends AbstractPreAndPostProcessingAuthenticationHandler {

    private final Log logger = LogFactory.getLog(this.getClass());

    public UsernamePasswordSystemAuthenticationHandler(String name, ServicesManager servicesManager, PrincipalFactory principalFactory, Integer order) {
        super(name, servicesManager, principalFactory, order);
    }

    @Override
    protected AuthenticationHandlerExecutionResult doAuthentication(Credential credential) throws GeneralSecurityException, PreventedException {

        logger.info("doAuthentication");
        logger.info("============================================================================");
        
        AuthenticationHandlerExecutionResult result = handleAuthentication(credential);
        if (result == null) throw new FailedLoginException("Invalid credential provided");	
        
        return result;
    }
    
	private AuthenticationHandlerExecutionResult handleAuthentication(Credential credential) throws GeneralSecurityException, PreventedException {

		boolean hsmResult = true;
		final List<MessageDescriptor> messageList = new ArrayList<>(0);
		
		// Collections.emptyMap()
		Map<String, Object> attributes = new HashMap<>();
		attributes.put("TESTING-1", "TESTING-1");
		attributes.put("TESTING-2", "TESTING-2");

		if (hsmResult) {
			return createHandlerResult(credential, attributes, messageList);
		} else {
			return null;
		}
	}
    
    
	private AuthenticationHandlerExecutionResult createHandlerResult(Credential credential,  Map<String, Object> attributes, List<MessageDescriptor> messageList) {
		
		if (credential instanceof UsernamePasswordSysCredential) {
			logger.info("handleAuthentication from R1...................................");
			return createHandlerResult((UsernamePasswordSysCredential) credential, this.principalFactory.createPrincipal(((UsernamePasswordSysCredential) credential).getUsername(), attributes), messageList);
		
		} else if (credential instanceof UsernamePasswordCredential) {
			logger.info("handleAuthentication from R2....................................");
			return createHandlerResult((UsernamePasswordCredential) credential, this.principalFactory.createPrincipal(((UsernamePasswordCredential) credential).getUsername(), attributes), messageList);
		}
		
		return null;
    }
    

    @Override
    public boolean supports(Credential credential) {
        return credential instanceof UsernamePasswordSysCredential || credential instanceof UsernamePasswordCredential;
    }
}
