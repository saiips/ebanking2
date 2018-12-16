package com.dsb.eb2.framework.security;

import static org.pac4j.core.util.CommonHelper.assertNotNull;

import java.io.IOException;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.HttpStatus;
import org.pac4j.core.config.Config;
import org.pac4j.core.context.J2EContext;
import org.pac4j.core.context.session.SessionStore;
import org.pac4j.core.engine.SecurityLogic;
import org.pac4j.core.http.adapter.J2ENopHttpActionAdapter;
import org.springframework.beans.factory.annotation.Autowired;

import com.dsb.eb2.framework.controller.ApiController;
import com.dsb.eb2.framework.security.exceptions.InvalidJwtToken;
import com.dsb.eb2.framework.security.exceptions.JwtExpiredTokenException;
import com.dsb.eb2.sso.auth.crypto.Crypto;
import com.dsb.eb2.sso.auth.jwt.extractor.TokenExtractor;

import io.buji.pac4j.context.ShiroSessionStore;
import io.buji.pac4j.engine.ShiroSecurityLogic;


public class JwtAuthSecurityFilter implements Filter {
	
	private final Log logger = LogFactory.getLog(this.getClass());
	
    private String tokenHeader;
    
    private String tokenHead;	

    private SecurityLogic<Object, J2EContext> securityLogic;

    private Config config;

    private String clients;

    private String authorizers;

    private String matchers;

    private Boolean multiProfile;
    
    private AuthService authService;
    
    @Autowired
    private Crypto crypto;
    
    @Autowired
    private TokenExtractor tokenExtractor;

    public JwtAuthSecurityFilter(String tokenHeader, String tokenHead, AuthService authService) {
        securityLogic = new ShiroSecurityLogic<>();
        this.tokenHeader = tokenHeader;
        this.tokenHead = tokenHead;
        this.authService = authService;
    }

    @Override
    public void init(final FilterConfig filterConfig) throws ServletException {}

    @Override
    public void doFilter(final ServletRequest servletRequest, final ServletResponse servletResponse, final FilterChain filterChain) throws IOException, ServletException {
    	
        assertNotNull("securityLogic", securityLogic);
        assertNotNull("config", config);

        final HttpServletRequest request = (HttpServletRequest) servletRequest;
        final HttpServletResponse response = (HttpServletResponse) servletResponse;
        final SessionStore<J2EContext> sessionStore = config.getSessionStore();
        final J2EContext context = new J2EContext(request, response, sessionStore != null ? sessionStore : ShiroSessionStore.INSTANCE);
        
        String clientName = request.getParameter("client_name");
        String token = request.getParameter("token");
        
    	if (clientName != null && token != null) {    
    		
    		String result = authService.validate(request, response, token);
    		logger.info("token status = " + result);
    		// E = Expired
    		// I = Invalid
    		// Empty String = proceed CAS Authentication
    		
    		if (ApiController.TOKEN_EXPIRED.equals(result)) {
    			response.sendError(HttpServletResponse.SC_UNAUTHORIZED, new JwtExpiredTokenException().getClass().getSimpleName());
    		}
    		
    		if (ApiController.TOKEN_INVALID.equals(result)) {
    			response.sendError(HttpServletResponse.SC_UNAUTHORIZED, new InvalidJwtToken().getClass().getSimpleName());
    		}
    		
    		if (ApiController.TOKEN_VALID.equals(result)) {
    			// perform cas authentication
		        securityLogic.perform(context, config, (ctx, profiles, parameters) -> {
		
		            filterChain.doFilter(request, response);
		            return null;
		
		        }, J2ENopHttpActionAdapter.INSTANCE, clients, authorizers, matchers, multiProfile);
    		}
        
    	}
    }

    @Override
    public void destroy() {}

    public SecurityLogic<Object, J2EContext> getSecurityLogic() {
        return securityLogic;
    }

    public void setSecurityLogic(final SecurityLogic<Object, J2EContext> securityLogic) {
        this.securityLogic = securityLogic;
    }

    public Config getConfig() {
        return config;
    }

    public void setConfig(final Config config) {
        this.config = config;
    }

    public String getClients() {
        return clients;
    }

    public void setClients(final String clients) {
        this.clients = clients;
    }

    public String getAuthorizers() {
        return authorizers;
    }

    public void setAuthorizers(final String authorizers) {
        this.authorizers = authorizers;
    }

    public String getMatchers() {
        return matchers;
    }

    public void setMatchers(final String matchers) {
        this.matchers = matchers;
    }

    public Boolean getMultiProfile() {
        return multiProfile;
    }

    public void setMultiProfile(final Boolean multiProfile) {
        this.multiProfile = multiProfile;
    }
}
