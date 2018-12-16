package com.dsb.eb2.sso.support.single.service;

import java.util.List;


public interface IUserIdObtainService {

    List<String> obtain(String clientName, String id);
}
