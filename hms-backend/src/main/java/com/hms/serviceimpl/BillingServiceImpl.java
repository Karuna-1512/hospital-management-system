package com.hms.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.entity.Billing;
import com.hms.exception.ResourceNotFoundException;
import com.hms.repository.BillingRepository;
import com.hms.service.BillingService;

@Service
public class BillingServiceImpl implements BillingService {

    @Autowired
    private BillingRepository billingRepository;

    @Override
    public Billing saveBilling(Billing billing) {
        return billingRepository.save(billing);
    }

    @Override
    public List<Billing> getAllBills() {
        return billingRepository.findAll();
    }

    @Override
    public Billing getBillById(Long id) {
        return billingRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Bill not found with id : " + id));
    }

    @Override
    public Billing updateBilling(Long id, Billing billing) {

        Billing existingBill = billingRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Bill not found with id : " + id));

        existingBill.setPatientName(billing.getPatientName());
        existingBill.setDoctorName(billing.getDoctorName());
        existingBill.setDate(billing.getDate());
        existingBill.setConsultationFee(billing.getConsultationFee());
        existingBill.setMedicineCharges(billing.getMedicineCharges());
        existingBill.setLabCharges(billing.getLabCharges());
        existingBill.setRoomCharges(billing.getRoomCharges());
        existingBill.setTotalAmount(billing.getTotalAmount());
        existingBill.setPaymentStatus(billing.getPaymentStatus());

        return billingRepository.save(existingBill);
    }
    @Override
    public void deleteBill(Long id) {

        Billing bill = billingRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Bill not found with id : " + id));

        billingRepository.delete(bill);
    }
}