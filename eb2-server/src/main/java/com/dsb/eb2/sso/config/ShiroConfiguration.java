package com.dsb.eb2.sso.config;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.Filter;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.shiro.mgt.SubjectFactory;
import org.apache.shiro.realm.Realm;
import org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.spring.web.config.AbstractShiroWebFilterConfiguration;
import org.apache.shiro.spring.web.config.DefaultShiroFilterChainDefinition;
import org.apache.shiro.spring.web.config.ShiroFilterChainDefinition;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.jasig.cas.client.session.SingleSignOutFilter;
import org.jasig.cas.client.session.SingleSignOutHttpSessionListener;
import org.pac4j.cas.client.CasClient;
import org.pac4j.cas.client.rest.CasRestFormClient;
import org.pac4j.cas.config.CasConfiguration;
import org.pac4j.cas.config.CasProtocol;
import org.pac4j.cas.credentials.authenticator.CasRestAuthenticator;
import org.pac4j.core.client.Clients;
import org.pac4j.core.config.Config;
import org.pac4j.http.client.direct.ParameterClient;
import org.pac4j.jwt.config.encryption.SecretEncryptionConfiguration;
import org.pac4j.jwt.config.signature.SecretSignatureConfiguration;
import org.pac4j.jwt.credentials.authenticator.JwtAuthenticator;
import org.pac4j.jwt.profile.JwtGenerator;
import org.springframework.aop.framework.autoproxy.DefaultAdvisorAutoProxyCreator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.ServletListenerRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.web.filter.DelegatingFilterProxy;

import com.dsb.eb2.framework.security.AuthService;
import com.dsb.eb2.framework.security.JwtAuthSecurityFilter;
import com.dsb.eb2.sso.auth.jwt.extractor.JwtHeaderTokenExtractor;

import io.buji.pac4j.filter.CallbackFilter;
import io.buji.pac4j.filter.LogoutFilter;
import io.buji.pac4j.subject.Pac4jSubjectFactory;

@Configuration
@Order(2)
public class ShiroConfiguration extends AbstractShiroWebFilterConfiguration {
	
	private final Log logger = LogFactory.getLog(this.getClass());
	
    @Value("#{ @environment['cas.prefixUrl'] ?: null }")
    private String prefixUrl;
    
    @Value("#{ @environment['cas.loginUrl'] ?: null }")
    private String casLoginUrl;
    
    @Value("#{ @environment['cas.callbackUrl'] ?: null }")
    private String callbackUrl;
    
    @Value("#{ @environment['cas.serviceUrl'] ?: null }")
    private String serviceUrl;    
    
    // @Value("${jwt.salt}")
    @Value("#{ @environment['jwt.salt'] ?: null }")
    private String salt;
    
    @Value("#{ @environment['jwt.header'] ?: null }")
    private String tokenHeader;
    
    @Value("#{ @environment['jwt.refreshHeader'] ?: null }")
    private String refreshHeader;    

    @Value("#{ @environment['jwt.tokenHead'] ?: null }")
    private String tokenHead;	 
    
    @Autowired
    private AuthService authService;
    
    @Bean(name = "pac4jRealm")
    public Realm pac4jRealm() {
        return new CustomPac4jRealm();
    }

    @Bean
    protected JwtGenerator jwtGenerator() {
    	JwtGenerator generator = new JwtGenerator(new SecretSignatureConfiguration(salt), new SecretEncryptionConfiguration(salt));
    	return generator;
    }
    
    @Bean
    protected JwtAuthenticator jwtAuthenticator() {
        JwtAuthenticator jwtAuthenticator = new JwtAuthenticator();
        jwtAuthenticator.addSignatureConfiguration(new SecretSignatureConfiguration(salt));
        jwtAuthenticator.addEncryptionConfiguration(new SecretEncryptionConfiguration(salt));
        return jwtAuthenticator;
    }
    
    @Bean
    protected JwtHeaderTokenExtractor jwtHeaderTokenExtractor() {
    	return new JwtHeaderTokenExtractor();
    }
    
    @Bean
    public CasConfiguration casConfiguration() {
        CasConfiguration casConfiguration = new CasConfiguration(casLoginUrl);
        casConfiguration.setProtocol(CasProtocol.CAS30);
        casConfiguration.setPrefixUrl(prefixUrl);
        return casConfiguration;
    }    
    
    @Bean
    protected CasRestFormClient casRestFormClient(CasConfiguration casConfiguration) {
        CasRestFormClient casRestFormClient = new CasRestFormClient();
        casRestFormClient.setConfiguration(casConfiguration);
        casRestFormClient.setName("rest");
        return casRestFormClient;
    }
    
    @Bean
    protected CasRestAuthenticator casRestAuthentiator(CasConfiguration casConfiguration) {
    	CasRestAuthenticator restAuthenticator = new CasRestAuthenticator(casConfiguration);
    	return restAuthenticator;
    }
    
    @Bean
    public CasClient casClient(CasConfiguration casConfiguration) {
        CasClient casClient = new CasClient();
        casClient.setConfiguration(casConfiguration);
        casClient.setCallbackUrl(callbackUrl);
        casClient.setName("cas");
        return casClient;
    }
    
    
    @Bean
    protected Clients clients(CasClient casClient, CasRestFormClient casRestFormClient) {
        Clients clients = new Clients();
        ParameterClient parameterClient = new ParameterClient("token", jwtAuthenticator());
        parameterClient.setSupportGetRequest(true);
        parameterClient.setSupportPostRequest(true);
        parameterClient.setName("jwt");
        clients.setClients(casClient, casRestFormClient, parameterClient);
        return clients;
    }
    
    
    @Bean
    protected Config casConfig(Clients clients) {
        Config config = new Config();
        config.setClients(clients);
        return config;
    }
    
    @Bean
    protected SubjectFactory subjectFactory() {
        return new Pac4jSubjectFactory();
    }
    
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Bean
	public ServletListenerRegistrationBean<?> singleSignOutHttpSessionListener() {
		ServletListenerRegistrationBean bean = new ServletListenerRegistrationBean();
		bean.setListener(new SingleSignOutHttpSessionListener());
		bean.setEnabled(true);
		return bean;
	}    
    
	@Bean
	@Order(Ordered.HIGHEST_PRECEDENCE)
	public FilterRegistrationBean singleSignOutFilter() {
		FilterRegistrationBean bean = new FilterRegistrationBean();
		bean.setName("singleSignOutFilter");
		SingleSignOutFilter singleSignOutFilter = new SingleSignOutFilter();
		singleSignOutFilter.setCasServerUrlPrefix(prefixUrl);
		singleSignOutFilter.setIgnoreInitConfiguration(true);
		bean.setFilter(singleSignOutFilter);
		bean.addUrlPatterns("/*");
		bean.setEnabled(true);
		return bean;
	}
    
    @Bean(name="securityManager")
    public DefaultWebSecurityManager securityManager(Realm pac4jRealm, SubjectFactory subjectFactory) {
        DefaultWebSecurityManager defaultWebSecurityManager  = new DefaultWebSecurityManager();
        defaultWebSecurityManager.setSubjectFactory(subjectFactory);
        defaultWebSecurityManager.setRealm(pac4jRealm);
        // SecurityUtils.setSecurityManager(defaultWebSecurityManager);
        return defaultWebSecurityManager ;
    }  
    
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Bean
	public FilterRegistrationBean filterRegistrationBean() {
		FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
		filterRegistrationBean.setFilter(new DelegatingFilterProxy("shiroFilter"));
		filterRegistrationBean.addInitParameter("targetFilterLifecycle", "true");
		filterRegistrationBean.setEnabled(true);
		filterRegistrationBean.addUrlPatterns("/*");
		return filterRegistrationBean;
	}    
    

    
    @Bean(name="shiroFilter")
    protected ShiroFilterFactoryBean shiroFilterFactoryBean(DefaultWebSecurityManager securityManager, Config config) {
    	ShiroFilterFactoryBean filterFactoryBean = super.shiroFilterFactoryBean();
        filterFactoryBean.setSecurityManager(securityManager);
        
        Map<String, Filter> filters = new HashMap<>();
//        SecurityFilter securityFilter = new SecurityFilter();
//        securityFilter.setClients("cas,rest,jwt");
//        securityFilter.setConfig(config);
//        filters.put("casSecurityFilter", securityFilter);
        
        JwtAuthSecurityFilter jwtAuthTokenFilter = new JwtAuthSecurityFilter(this.tokenHeader, this.tokenHead, this.authService);
        jwtAuthTokenFilter.setClients("cas,rest,jwt");
        jwtAuthTokenFilter.setConfig(config);        
        filters.put("jwtAuthTokenFilter", jwtAuthTokenFilter);
        
        CallbackFilter callbackFilter = new CallbackFilter();
        callbackFilter.setConfig(config);
        filters.put("callbackFilter", callbackFilter);    
        
        LogoutFilter logoutFilter = new LogoutFilter();
        logoutFilter.setConfig(config);
        filters.put("logoutFilter", logoutFilter);        
        
        filterFactoryBean.setFilters(filters);

        return filterFactoryBean;
    }
    
    @Bean
    public ShiroFilterChainDefinition shiroFilterChainDefinition() {
        DefaultShiroFilterChainDefinition definition = new DefaultShiroFilterChainDefinition();
        definition.addPathDefinition("/callback", "callbackFilter");
        definition.addPathDefinition("/logout", "logoutFilter");
        // definition.addPathDefinition("/**", "casSecurityFilter");
        definition.addPathDefinition("/api/**", "jwtAuthTokenFilter");
        definition.addPathDefinition("/sso/**", "anon");
//        definition.addPathDefinition("/api/**", "jwtAuthTokenFilter");
        // definition.addPathDefinition("/eb2/home", "anon");
        // definition.addPathDefinition("/home", "anon");
        return definition;
    }    
    
    @Bean
    @DependsOn({"lifecycleBeanPostProcessor"})
    public DefaultAdvisorAutoProxyCreator advisorAutoProxyCreator(){
        DefaultAdvisorAutoProxyCreator advisorAutoProxyCreator = new DefaultAdvisorAutoProxyCreator();
        advisorAutoProxyCreator.setProxyTargetClass(true);
        return advisorAutoProxyCreator;
    }

     @Bean
     public AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor(DefaultWebSecurityManager securityManager) {
         AuthorizationAttributeSourceAdvisor aasa = new AuthorizationAttributeSourceAdvisor();
         aasa.setSecurityManager(securityManager);
         return aasa;
     }


}
