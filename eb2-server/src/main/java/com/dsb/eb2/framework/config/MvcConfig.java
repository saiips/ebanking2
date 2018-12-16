package com.dsb.eb2.framework.config;

import org.pac4j.core.config.Config;
import org.pac4j.springframework.web.SecurityInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.dsb.eb2.framework.interceptor.RequestInterceptor;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    @Autowired
    private Config config;
    
	@Autowired
	RequestInterceptor requestInterceptor;
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(requestInterceptor).addPathPatterns(new String[] { "/api", "/api/*" });
		registry.addInterceptor(new SecurityInterceptor(config, "ParameterClient")).addPathPatterns("/sso");
	}
	
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("*")
            .allowedMethods("GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .exposedHeaders("X-Authorization", "X-Refresh-Authorization")
            .allowCredentials(true).maxAge(3600);
    }	


}
