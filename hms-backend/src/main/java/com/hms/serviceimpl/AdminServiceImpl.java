package com.hms.serviceimpl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.entity.Admin;
import com.hms.repository.AdminRepository;
import com.hms.service.AdminService;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public Admin register(Admin admin) {
        return adminRepository.save(admin);
    }

    @Override
    public String login(String username, String password) {

        Optional<Admin> admin = adminRepository.findByUsername(username);

        if (admin.isPresent() &&
                admin.get().getPassword().equals(password)) {

            return "Login Successful";
        }

        return "Invalid Username or Password";
    }
}