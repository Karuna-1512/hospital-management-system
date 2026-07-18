package com.hms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hms.dto.AppointmentRequest;
import com.hms.entity.Appointment;
import com.hms.service.AppointmentService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;


@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Appointment APIs", description = "Appointment Management APIs")
public class AppointmentController {


    @Autowired
    private AppointmentService appointmentService;



    @Operation(summary = "Book Appointment")
    @PostMapping
    public ResponseEntity<Appointment> saveAppointment(
            @RequestBody AppointmentRequest request) {

        return new ResponseEntity<>(
                appointmentService.saveAppointment(request),
                HttpStatus.CREATED
        );
    }



    @Operation(summary = "Get All Appointments")
    @GetMapping
    public ResponseEntity<List<Appointment>> getAllAppointments() {

        return ResponseEntity.ok(
                appointmentService.getAllAppointments()
        );
    }



    @Operation(summary = "Get Appointment by ID")
    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                appointmentService.getAppointmentById(id)
        );
    }



    @Operation(summary = "Update Appointment")
    @PutMapping("/{id}")
    public ResponseEntity<Appointment> updateAppointment(
            @PathVariable Long id,
            @RequestBody Appointment appointment) {

        return ResponseEntity.ok(
                appointmentService.updateAppointment(id, appointment)
        );
    }



    @Operation(summary = "Delete Appointment")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAppointment(
            @PathVariable Long id) {

        appointmentService.deleteAppointment(id);

        return ResponseEntity.ok(
                "Appointment deleted successfully!"
        );
    }
}