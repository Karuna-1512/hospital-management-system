package com.hms.service;

import java.util.List;

import com.hms.dto.AppointmentRequest;
import com.hms.entity.Appointment;


public interface AppointmentService {


    Appointment saveAppointment(AppointmentRequest request);


    List<Appointment> getAllAppointments();


    Appointment getAppointmentById(Long id);


    Appointment updateAppointment(Long id, Appointment appointment);


    void deleteAppointment(Long id);

}