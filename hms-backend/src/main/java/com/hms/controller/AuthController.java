package com.hms.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hms.entity.Admin;
import com.hms.repository.AdminRepository;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins="http://localhost:5173")
public class AuthController {


@Autowired
private AdminRepository adminRepository;



@PostMapping("/login")
public Admin login(@RequestBody Admin admin){


    Admin existing =
        adminRepository.findByUsername(admin.getUsername());


    if(existing != null &&
       existing.getPassword().equals(admin.getPassword())){


        return existing;

    }


    return null;

}

}