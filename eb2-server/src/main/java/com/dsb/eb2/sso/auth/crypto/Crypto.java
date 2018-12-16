package com.dsb.eb2.sso.auth.crypto;

public interface Crypto {
	 public String encrypt(String payload);
	 public String decrypt(String payload);
}
