package com.dsb.eb2.sso.auth.jwt.extractor;

public interface TokenExtractor {
    public String extract(String payload);
}
