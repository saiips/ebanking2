package com.dsb.eb2.framework.log;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.boot.logging.LogLevel;
import org.springframework.stereotype.Component;

@Component
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE, ElementType.METHOD})
public @interface Loggable {
    LogLevel value() default LogLevel.INFO;

    boolean params() default true;

    boolean result() default true;

}