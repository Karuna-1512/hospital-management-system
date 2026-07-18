package com.hms.service;

import com.hms.entity.Admin;

public interface AdminService {

    Admin register(Admin admin);

    String login(String username, String password);
}