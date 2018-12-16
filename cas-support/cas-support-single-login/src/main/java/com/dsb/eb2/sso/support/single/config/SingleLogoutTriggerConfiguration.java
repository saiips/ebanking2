package com.dsb.eb2.sso.support.single.config;

import com.dsb.eb2.sso.support.single.listener.TGTCreateEventListener;
import com.dsb.eb2.sso.support.single.service.TriggerLogoutService;
import com.dsb.eb2.sso.support.single.service.UserIdObtainServiceImpl;
import org.apereo.cas.CentralAuthenticationService;
import org.apereo.cas.configuration.CasConfigurationProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration("singleLogoutTriggerConfiguration")
@EnableConfigurationProperties(CasConfigurationProperties.class)
public class SingleLogoutTriggerConfiguration {
    @Autowired
    private CentralAuthenticationService centralAuthenticationService;


    @Bean
    protected TriggerLogoutService triggerLogoutService() {
        return new TriggerLogoutService(centralAuthenticationService);
    }

    @Bean
    protected TGTCreateEventListener tgtCreateEventListener() {
        TGTCreateEventListener listener = new TGTCreateEventListener(triggerLogoutService(), new UserIdObtainServiceImpl());
        return listener;
    }
}
