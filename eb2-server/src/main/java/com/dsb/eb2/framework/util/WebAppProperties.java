package com.dsb.eb2.framework.util;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties("osb.webapp")
public class WebAppProperties {
	
	private String url;
	private String connectionTimeout;
	private String readTimeout;

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getConnectionTimeout() {
		return connectionTimeout;
	}

	public void setConnectionTimeout(String connectionTimeout) {
		this.connectionTimeout = connectionTimeout;
	}

	public String getReadTimeout() {
		return readTimeout;
	}

	public void setReadTimeout(String readTimeout) {
		this.readTimeout = readTimeout;
	}
	
	
	
}
