package com.dsb.eb2.sso.config;

import org.apache.shiro.spring.LifecycleBeanPostProcessor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

@Configuration
@Order(1)
public class LifecycleBeanPostProcessorConfig {
	  @Bean(name="lifecycleBeanPostProcessor")
	  public LifecycleBeanPostProcessor lifecycleBeanPostProcessor(){
	      return new LifecycleBeanPostProcessor();
	  }
}
