package com.hms.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.dto.AppointmentRequest;
import com.hms.entity.Appointment;
import com.hms.entity.Doctor;
import com.hms.entity.Patient;
import com.hms.exception.ResourceNotFoundException;
import com.hms.repository.AppointmentRepository;
import com.hms.repository.DoctorRepository;
import com.hms.repository.PatientRepository;
import com.hms.service.AppointmentService;


@Service
public class AppointmentServiceImpl implements AppointmentService {


    @Autowired
    private AppointmentRepository appointmentRepository;


    @Autowired
    private PatientRepository patientRepository;


    @Autowired
    private DoctorRepository doctorRepository;



    @Override
    public Appointment saveAppointment(AppointmentRequest request) {


        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Patient not found"));


        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Doctor not found"));



        Appointment appointment = new Appointment();


        appointment.setAppointmentDate(
                request.getAppointmentDate()
        );


        appointment.setAppointmentTime(
                request.getAppointmentTime()
        );


        appointment.setStatus(
                request.getStatus()
        );


        appointment.setPatient(patient);

        appointment.setDoctor(doctor);



        return appointmentRepository.save(appointment);
    }




    @Override
    public List<Appointment> getAllAppointments() {

        return appointmentRepository.findAll();
    }





    @Override
    public Appointment getAppointmentById(Long id) {

        return appointmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Appointment not found with id: " + id
                        ));
    }





    @Override
    public Appointment updateAppointment(
            Long id,
            Appointment appointment) {


        Appointment existingAppointment =
                appointmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Appointment not found with id: " + id
                        ));



        existingAppointment.setAppointmentDate(
                appointment.getAppointmentDate()
        );


        existingAppointment.setAppointmentTime(
                appointment.getAppointmentTime()
        );


        existingAppointment.setStatus(
                appointment.getStatus()
        );



        if (appointment.getPatient() != null) {

            Patient patient =
                    patientRepository.findById(
                            appointment.getPatient().getPatientId()
                    )
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Patient not found"
                            ));

            existingAppointment.setPatient(patient);
        }



        if (appointment.getDoctor() != null) {

            Doctor doctor =
                    doctorRepository.findById(
                            appointment.getDoctor().getDoctorId()
                    )
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Doctor not found"
                            ));

            existingAppointment.setDoctor(doctor);
        }



        return appointmentRepository.save(existingAppointment);
    }





    @Override
    public void deleteAppointment(Long id) {


        Appointment appointment =
                appointmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Appointment not found with id: " + id
                        ));


        appointmentRepository.delete(appointment);
    }

}