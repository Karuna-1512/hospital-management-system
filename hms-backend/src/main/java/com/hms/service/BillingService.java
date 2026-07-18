package com.hms.service;

import java.util.List;
import com.hms.entity.Billing;

public interface BillingService {

    Billing saveBilling(Billing billing);

    List<Billing> getAllBills();

    Billing getBillById(Long id);

    Billing updateBilling(Long id, Billing billing);

    void deleteBill(Long id);
}