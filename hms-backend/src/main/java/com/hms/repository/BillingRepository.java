package com.hms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hms.entity.Billing;

public interface BillingRepository extends JpaRepository<Billing, Long> {

}