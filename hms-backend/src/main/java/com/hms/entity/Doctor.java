package com.hms.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "doctors")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long doctorId;


    @NotBlank(message = "Doctor name is required")
    private String doctorName;


    @NotBlank(message = "Specialization is required")
    private String specialization;


    @NotBlank(message = "Department is required")
    private String department;


    @Pattern(
        regexp = "^[0-9]{10}$",
        message = "Phone number must be 10 digits"
    )
    private String phone;


    @Email(message = "Invalid email")
    @NotBlank(message = "Email is required")
    private String email;


    @Min(value = 0, message = "Experience cannot be negative")
    private Integer experience;


    @Min(value = 0, message = "Fee cannot be negative")
    private Double fee;


    // Default Constructor
    public Doctor() {
    }


    // Parameterized Constructor
    public Doctor(Long doctorId,
                  String doctorName,
                  String specialization,
                  String department,
                  String phone,
                  String email,
                  Integer experience,
                  Double fee) {

        this.doctorId = doctorId;
        this.doctorName = doctorName;
        this.specialization = specialization;
        this.department = department;
        this.phone = phone;
        this.email = email;
        this.experience = experience;
        this.fee = fee;
    }


    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }


    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }


    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }


    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }


    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public Integer getExperience() {
        return experience;
    }

    public void setExperience(Integer experience) {
        this.experience = experience;
    }


    public Double getFee() {
        return fee;
    }

    public void setFee(Double fee) {
        this.fee = fee;
    }
}