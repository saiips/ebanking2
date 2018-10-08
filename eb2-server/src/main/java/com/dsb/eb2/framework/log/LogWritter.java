package com.dsb.eb2.framework.log;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.boot.logging.LogLevel;

public class LogWritter {
	
    public static void write(Class<?> clazz, LogLevel logLevel, String message) {
        Log logger = LogFactory.getLog(clazz);        
        
        switch (logLevel) {
            case TRACE:
                logger.trace(message);
                break;
            case DEBUG:
                logger.debug(message);
                break;
            case INFO:
                logger.info(message);
                break;
            case WARN:
                logger.warn(message);
                break;
            case ERROR:
                logger.error(message);
                break;
            case FATAL:
                logger.fatal(message);
                break;
            default:
                logger.warn("No suitable log level found");
                break;
        }
    }

}
