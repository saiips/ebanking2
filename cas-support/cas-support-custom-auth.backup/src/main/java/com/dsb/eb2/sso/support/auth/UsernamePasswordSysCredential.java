package com.dsb.eb2.sso.support.auth;

import javax.validation.constraints.Size;

import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apereo.cas.authentication.RememberMeUsernamePasswordCredential;

/**
 *	Username, Password, System
 */
@SuppressWarnings("serial")
public class UsernamePasswordSysCredential extends RememberMeUsernamePasswordCredential {
    @Size(min = 2, message = "require system")
    private String system;

    public String getSystem() {
        return system;
    }

    public UsernamePasswordSysCredential setSystem(String system) {
        this.system = system;
        return this;
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder()
                .appendSuper(super.hashCode())
                .append(this.system)
                .toHashCode();
    }
}
