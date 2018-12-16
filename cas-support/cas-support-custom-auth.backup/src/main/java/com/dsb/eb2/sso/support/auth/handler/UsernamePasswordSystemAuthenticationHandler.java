package com.dsb.eb2.sso.support.auth.handler;

import java.security.GeneralSecurityException;
import java.util.Collections;

import javax.security.auth.login.FailedLoginException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apereo.cas.authentication.AuthenticationHandlerExecutionResult;
import org.apereo.cas.authentication.Credential;
import org.apereo.cas.authentication.PreventedException;
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

        logger.info("****************************************** doAuthentication");
        UsernamePasswordSysCredential sysCredential = (UsernamePasswordSysCredential) credential;
        if (sysCredential != null) {
            logger.info("sysCredential" + sysCredential.toString());
            logger.info("sysCredential.getUsername()=" + sysCredential.getUsername());
            logger.info("sysCredential.getSystem()=" + sysCredential.getSystem());
        }
        if ("admin".equals(sysCredential.getUsername()) && "sso".equals(sysCredential.getSystem())) {
            logger.info("****************************************** admin");
            return createHandlerResult(credential, this.principalFactory.createPrincipal(((UsernamePasswordSysCredential) credential).getUsername(), Collections.emptyMap()), null);
        } else {
            logger.info("****************************************** exception");
            // throw new AccountNotFoundException("Must be admin");
            throw new FailedLoginException("Sorry, you are simply a big huge failure!");
        }
    }


    @Override
    public boolean supports(Credential credential) {
        return credential instanceof UsernamePasswordSysCredential;
    }
}
