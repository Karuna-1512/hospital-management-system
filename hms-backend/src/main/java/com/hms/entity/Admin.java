package com.hms.entity;

import jakarta.persistence.*;

@Entity
@Table(name="admins")
public class Admin {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "admin_id")
	private Long id;

    private String username;

    private String password;

    private String email;

    private String phone;

    @Column(name = "hospital_name")
    private String hospitalName;

    private String address;


    public Admin(){}


    public Long getId() {
        return id;
    }

    public void setId(Long id){
        this.id=id;
    }


    public String getUsername(){
        return username;
    }

    public void setUsername(String username){
        this.username=username;
    }


    public String getPassword(){
        return password;
    }

    public void setPassword(String password){
        this.password=password;
    }


    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email=email;
    }


    public String getPhone(){
        return phone;
    }

    public void setPhone(String phone){
        this.phone=phone;
    }


    public String getHospitalName(){
        return hospitalName;
    }

    public void setHospitalName(String hospitalName){
        this.hospitalName=hospitalName;
    }


    public String getAddress(){
        return address;
    }

    public void setAddress(String address){
        this.address=address;
    }

}