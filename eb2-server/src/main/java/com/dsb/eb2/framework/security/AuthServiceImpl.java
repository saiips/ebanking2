package com.dsb.eb2.framework.security;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.pac4j.cas.client.rest.CasRestFormClient;
import org.pac4j.cas.credentials.authenticator.CasRestAuthenticator;
import org.pac4j.cas.profile.CasProfile;
import org.pac4j.cas.profile.CasRestProfile;
import org.pac4j.core.context.J2EContext;
import org.pac4j.core.context.WebContext;
import org.pac4j.core.credentials.TokenCredentials;
import org.pac4j.core.credentials.UsernamePasswordCredentials;
import org.pac4j.core.exception.CredentialsException;
import org.pac4j.jwt.credentials.authenticator.JwtAuthenticator;
import org.pac4j.jwt.profile.JwtGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.dsb.eb2.framework.controller.ApiController;
import com.dsb.eb2.sso.auth.crypto.Crypto;
import com.dsb.eb2.sso.auth.jwt.extractor.JwtHeaderTokenExtractor;

@Service
public class AuthServiceImpl implements AuthService {
	private final Log logger = LogFactory.getLog(this.getClass());
	
	private final static boolean isCryptoRequired = false;

	@Value("${cas.serviceUrl}")
	private String serviceUrl;

	private JwtGenerator generator;
	private JwtAuthenticator authenticator;
	private JwtHeaderTokenExtractor tokenExtrator;
	private CasRestFormClient casRestFormClient;
	private CasRestAuthenticator casRestAuthenticator;
	private Crypto crypto;

	@Autowired
	public AuthServiceImpl(JwtGenerator generator, JwtAuthenticator authenticator,
			JwtHeaderTokenExtractor tokenExtrator, CasRestFormClient casRestFormClient,
			CasRestAuthenticator casRestAuthenticator, Crypto crypto) {
		this.generator = generator;
		this.authenticator = authenticator;
		this.tokenExtrator = tokenExtrator;
		this.casRestFormClient = casRestFormClient;
		this.casRestAuthenticator = casRestAuthenticator;
		this.crypto = crypto;
	}

	@Override
	public HttpHeaders login(HttpServletRequest request, HttpServletResponse response, String username, String pinblock) {
		HttpHeaders headers = new HttpHeaders();

		// get the webContext
		final WebContext webContext = new J2EContext(request, response);
		final UsernamePasswordCredentials credentials = new UsernamePasswordCredentials(username, pinblock);

		casRestAuthenticator.validate(credentials, webContext);
		final CasRestProfile profile = (CasRestProfile) credentials.getUserProfile();
		logger.info("CasRestProfile = " + profile);
		logger.info("credentials =" + credentials);
		logger.info("CASTCG=TGT ==> " + profile.getTicketGrantingTicketId()); // align the expire policy timeToKillInMilliSeconds

		// get service ticket
		final TokenCredentials casCredentials = casRestFormClient.requestServiceTicket(serviceUrl, profile, webContext);
		logger.info("TokenCredentials = " + casCredentials);

		// validate service ticket
		final CasProfile casProfile = casRestFormClient.validateServiceTicket(serviceUrl, casCredentials, webContext);
		casProfile.addAttribute(ApiController.TGT, profile.getTicketGrantingTicketId());
		logger.info("CasProfile = " + casProfile);

		// produce the response header type
		constructResponseHeader(headers);

		// generate the access and refresh token
		genJwtToken(casProfile, headers);

		return headers;
	}

	@Override
	public HttpHeaders refresh(HttpServletRequest request, HttpServletResponse response, String header) {
    	final WebContext webContext = new J2EContext(request, response);
    	HttpHeaders headers = new HttpHeaders();
    	
    	String token = tokenExtrator.extract(header);
    	logger.info("token = " + token);
    	
    	if (isCryptoRequired) token = crypto.decrypt(token);
    	
    	constructResponseHeader(headers);
    	
    	getServiceTicket(request, response, token, headers);
		
    	return headers;
	}

	@Override
	public String validate(HttpServletRequest request, HttpServletResponse response, String token) {
		try {
			
        	// String token = tokenExtrator.extract(header);
        	// logger.info("token = " + token);
        	
        	if (isCryptoRequired) token = crypto.decrypt(token);
        	
			final CasProfile profile = (CasProfile) authenticator.validateToken(token);
			logger.info("profile = " + profile);

			// token expired
			if (profile == null) return ApiController.TOKEN_EXPIRED;

			// invalid token (it may be a refresh token)
			String jti = (String) profile.getAttribute(ApiController.JTI);
			logger.info("TGT = " + jti);
			if (!StringUtils.isEmpty(jti)) return ApiController.TOKEN_INVALID;
			// invalid token

		} catch (CredentialsException ce) {
			ce.printStackTrace();
			return ApiController.TOKEN_INVALID;

		} catch (Exception ex) {
			ex.printStackTrace();
			return ApiController.TOKEN_INVALID;
		}
		return ApiController.TOKEN_VALID;
	}
	
	@Override
	public String extractToken(String header) {
    	String token = tokenExtrator.extract(header);
    	
    	if (isCryptoRequired) token = crypto.decrypt(token);
    	
    	return token;
	}

	private HttpHeaders constructResponseHeader(HttpHeaders headers) {
		headers.add(ApiController.CONTENT_TYPE, ApiController.CONTENT_TYPE_APPL_JSON);
		return headers;
	}

	private void genJwtToken(CasProfile casProfile, HttpHeaders headers) {
		genAccessToken(casProfile, headers);
		genRefreshToken(casProfile, headers);
	}

	@SuppressWarnings({ "unchecked" })
	private void genAccessToken(CasProfile casProfile, HttpHeaders headers) {
		if (casProfile != null) {
			// generate the JWT token by the CAS Profile
			generator.setExpirationTime(fiveMinutes());

			String token = generator.generate(casProfile);
			logger.info("Access Token=" + token);
			
			if (isCryptoRequired) token = crypto.encrypt(token);

			headers.add(ApiController.AUTHORIZATION, ApiController.BEARER + token);
		}
	}

	@SuppressWarnings({ "unchecked" })
	private void genRefreshToken(CasProfile casProfile, HttpHeaders headers) {
		if (casProfile != null) {
			// generate the JWT token by the CAS Profile
			generator.setExpirationTime(tomorrow());

			CasProfile _casProfile = new CasProfile();
			_casProfile.setId(casProfile.getId());
			_casProfile.addAttribute(ApiController.JTI, casProfile.getAttribute(ApiController.TGT));

			String token = generator.generate(_casProfile);

			if (isCryptoRequired) token = crypto.encrypt(token);

			headers.add(ApiController.REFRESH_AUTHORIZATION, ApiController.BEARER + token);
		}
	}
	
    private void getServiceTicket(HttpServletRequest request, HttpServletResponse response, String token, HttpHeaders headers) {
    	final WebContext webContext = new J2EContext(request, response);
    	
    	final CasProfile profile = (CasProfile) authenticator.validateToken(token);
    	logger.info("profile = " + profile);
    	
    	String tgt =  (String) profile.getAttribute(ApiController.JTI);
    	String subject = (String) profile.getId();
    	
    	CasRestProfile casRestProfile = new CasRestProfile(tgt, subject);
    	
    	final TokenCredentials casCredentials = casRestFormClient.requestServiceTicket(serviceUrl, casRestProfile, webContext);
        logger.info("CasRestProfile = " +casRestProfile);
        logger.info("TokenCredentials =" + casCredentials);
        logger.info("CASTCG=TGT ==> " + casRestProfile.getTicketGrantingTicketId());
    	
    	final CasProfile casProfile = casRestFormClient.validateServiceTicket(serviceUrl, casCredentials, webContext);
    	casProfile.addAttribute("TGT", tgt);
        logger.info("CasProfile = " + casProfile);

    	genJwtToken(casProfile, headers);
    }	

	private Date fiveMinutes() {
		final Date now = new Date();
		long fiveMinutes = now.getTime() + 60 * 1000;
		return new Date(fiveMinutes);
	}

	private Date tomorrow() {
		final Date now = new Date();
		long tomorrow = now.getTime() + 24 * 3600 * 1000;
		return new Date(tomorrow);
	}

	@SuppressWarnings("unused")
	private Date yesterday() {
		final Date now = new Date();
		long tomorrow = now.getTime() - 24 * 3600 * 1000;
		return new Date(tomorrow);
	}

}
