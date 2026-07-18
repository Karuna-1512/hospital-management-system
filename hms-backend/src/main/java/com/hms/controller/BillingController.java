package com.hms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hms.entity.Billing;
import com.hms.service.BillingService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/billing")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Billing APIs", description = "Billing Management APIs")
public class BillingController {

    @Autowired
    private BillingService billingService;

    @Operation(summary = "Create Bill")
    @PostMapping
    public ResponseEntity<Billing> saveBilling(@Valid @RequestBody Billing billing) {
        return new ResponseEntity<>(billingService.saveBilling(billing), HttpStatus.CREATED);
    }

    @Operation(summary = "Get All Bills")
    @GetMapping
    public ResponseEntity<List<Billing>> getAllBills() {
        return ResponseEntity.ok(billingService.getAllBills());
    }

    @Operation(summary = "Get Bill By ID")
    @GetMapping("/{id}")
    public ResponseEntity<Billing> getBillById(@PathVariable Long id) {
        return ResponseEntity.ok(billingService.getBillById(id));
    }

    @Operation(summary = "Update Bill")
    @PutMapping("/{id}")
    public ResponseEntity<Billing> updateBilling(@PathVariable Long id,
                                                 @Valid @RequestBody Billing billing) {
        return ResponseEntity.ok(billingService.updateBilling(id, billing));
    }

    @Operation(summary = "Delete Bill")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBill(@PathVariable Long id) {
        billingService.deleteBill(id);
        return ResponseEntity.ok("Bill deleted successfully!");
    }
}