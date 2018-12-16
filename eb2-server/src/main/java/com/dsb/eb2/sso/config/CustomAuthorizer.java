package com.dsb.eb2.sso.config;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.pac4j.core.authorization.authorizer.ProfileAuthorizer;
import org.pac4j.core.context.WebContext;
import org.pac4j.core.exception.HttpAction;
import org.pac4j.core.profile.CommonProfile;
import org.springframework.boot.logging.LogLevel;

import com.dsb.eb2.framework.log.Loggable;

@Loggable
public class CustomAuthorizer extends ProfileAuthorizer<CommonProfile> {

    @Override
	@Loggable(result = false, value = LogLevel.INFO)
    public boolean isAuthorized(final WebContext context, final List<CommonProfile> profiles) throws HttpAction {
        return isAnyAuthorized(context, profiles);
    }

    @Override
	@Loggable(result = false, value = LogLevel.INFO)
    public boolean isProfileAuthorized(final WebContext context, final CommonProfile profile) {
        if (profile == null) {
            return false;
        }
        return StringUtils.startsWith(profile.getUsername(), "jle");
    }
}