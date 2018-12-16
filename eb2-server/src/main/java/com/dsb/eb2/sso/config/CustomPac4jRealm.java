package com.dsb.eb2.sso.config;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.boot.logging.LogLevel;

import com.dsb.eb2.framework.log.Loggable;

import io.buji.pac4j.realm.Pac4jRealm;

public class CustomPac4jRealm extends Pac4jRealm {
	private final static String SELFAUTHZ = "user:edit";

	private final Log logger = LogFactory.getLog(this.getClass());

	@Override
	@Loggable(result = false, value = LogLevel.INFO)
	protected AuthenticationInfo doGetAuthenticationInfo(final AuthenticationToken authenticationToken) throws AuthenticationException {
		logger.info("x ======================== doGetAuthenticationInfo->" + authenticationToken.getCredentials());
		AuthenticationInfo x= super.doGetAuthenticationInfo(authenticationToken);
		logger.info("x ======================== doGetAuthenticationInfo->" + x.toString());
		return x;
	}

	@Override
	@Loggable(result = false, value = LogLevel.INFO)
	protected AuthorizationInfo doGetAuthorizationInfo(final PrincipalCollection principals) {
		String userName = (String) super.getAvailablePrincipal(principals);
		logger.info("======================== username->" + userName);
		SimpleAuthorizationInfo info = null;
		try {
			info = new SimpleAuthorizationInfo();
			List<String> permissions = new ArrayList<String>();
			permissions.add(SELFAUTHZ);
			logger.info("========================permission----------> {}" + SELFAUTHZ);
			info.addStringPermissions(permissions);

		} catch (Exception e) {
			logger.info("=====================ShiroCasRealm Exception---------------");
		}
		return info;
	}
}
