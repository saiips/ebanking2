package com.dsb.eb2.sso.support.single.service;


import java.util.ArrayList;
import java.util.List;

public class UserIdObtainServiceImpl implements IUserIdObtainService {

    public UserIdObtainServiceImpl() {

    }

    @Override
    public List<String> obtain(String clientName, String id) {
        List<String> ids = new ArrayList<>();
        ids.add(id);
        return ids;
    }
}
