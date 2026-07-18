import { useEffect, useState } from "react";
import { getAllBills } from "../services/billingService";
import "./Reports.css";
import {
  exportPatientsToExcel,
  exportPatientsToPDF,
} from "../reports/patientReport";

import {
  exportDoctorsToExcel,
  exportDoctorsToPDF,
} from "../reports/doctorReport";

import {
  exportAppointmentsToExcel,
  exportAppointmentsToPDF,
} from "../reports/appointmentReport";

import {
  exportBillsToExcel,
  exportBillsToPDF,
} from "../reports/billingReport";

function Reports({
  patients = [],
  doctors = [],
  appointments = [],
}) {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    loadBills();
  }, []);

  const loadBills = async () => {
    try {
      const response = await getAllBills();
      setBills(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const totalPatients = patients.length;
  const totalDoctors = doctors.length;
  const totalAppointments = appointments.length;
  const totalBills = bills.length;

  const totalRevenue = bills.reduce(
    (sum, bill) => sum + Number(bill.totalAmount || 0),
    0
  );

  const paidBills = bills.filter(
    (bill) => bill.paymentStatus === "Paid"
  ).length;

  const pendingBills = bills.filter(
    (bill) => bill.paymentStatus === "Pending"
  ).length;

  return (
    <div className="container-fluid">

      <h2 className="mb-4 fw-bold">Reports Dashboard</h2>

      {/* Summary Cards */}

      <div className="row g-4 mb-4">

        <div className="col-md-3">
          <div className="card border-0 shadow-lg report-card bg-primary text-white h-100">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-uppercase">Patients</h6>
                <h2 className="fw-bold">{totalPatients}</h2>
              </div>
              <i className="bi bi-people-fill display-4"></i>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-lg report-card bg-success text-white h-100">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-uppercase">Doctors</h6>
                <h2 className="fw-bold">{totalDoctors}</h2>
              </div>
              <i className="bi bi-person-badge-fill display-4"></i>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-lg report-card bg-warning h-100">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-uppercase">Appointments</h6>
                <h2 className="fw-bold">{totalAppointments}</h2>
              </div>
              <i className="bi bi-calendar-check-fill display-4"></i>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-lg report-card bg-danger text-white h-100">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-uppercase">Bills</h6>
                <h2 className="fw-bold">{totalBills}</h2>
              </div>
              <i className="bi bi-receipt-cutoff display-4"></i>
            </div>
          </div>
        </div>

      </div>

      <div className="row g-4 mb-5">

        <div className="col-md-4">
          <div className="card border-0 shadow-lg report-card bg-dark text-white">
            <div className="card-body text-center">
              <i className="bi bi-currency-rupee display-4"></i>
              <h5 className="mt-2">Total Revenue</h5>
              <h2 className="fw-bold">₹{totalRevenue}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-lg report-card bg-success text-white">
            <div className="card-body text-center">
              <i className="bi bi-check-circle-fill display-4"></i>
              <h5 className="mt-2">Paid Bills</h5>
              <h2 className="fw-bold">{paidBills}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-lg report-card bg-warning">
            <div className="card-body text-center">
              <i className="bi bi-hourglass-split display-4"></i>
              <h5 className="mt-2">Pending Bills</h5>
              <h2 className="fw-bold">{pendingBills}</h2>
            </div>
          </div>
        </div>

      </div>

      {/* Patient Report */}

      <div className="card shadow-lg border-0 rounded-4 mb-4 report-section">
        <div className="card-body d-flex justify-content-between align-items-center">

          <div>
            <h4 className="fw-bold text-primary">
              <i className="bi bi-people-fill me-2"></i>
              Patient Report
            </h4>

            <p className="text-muted mb-0">
              Download complete patient records in PDF or Excel format.
            </p>
          </div>

          <div>
            <button
              className="btn btn-danger me-2"
              onClick={() => exportPatientsToPDF(patients)}
            >
              <i className="bi bi-file-earmark-pdf-fill me-2"></i>
              PDF
            </button>

            <button
              className="btn btn-success"
              onClick={() => exportPatientsToExcel(patients)}
            >
              <i className="bi bi-file-earmark-excel-fill me-2"></i>
              Excel
            </button>
          </div>

        </div>
      </div>

      {/* Doctor Report */}

      <div className="card shadow-lg border-0 rounded-4 mb-4 report-section">
        <div className="card-body d-flex justify-content-between align-items-center">

          <div>
            <h4 className="fw-bold text-success">
              <i className="bi bi-person-badge-fill me-2"></i>
              Doctor Report
            </h4>

            <p className="text-muted mb-0">
              Download complete doctor information and specializations.
            </p>
          </div>

          <div>
            <button
              className="btn btn-danger me-2"
              onClick={() => exportDoctorsToPDF(doctors)}
            >
              <i className="bi bi-file-earmark-pdf-fill me-2"></i>
              PDF
            </button>

            <button
              className="btn btn-success"
              onClick={() => exportDoctorsToExcel(doctors)}
            >
              <i className="bi bi-file-earmark-excel-fill me-2"></i>
              Excel
            </button>
          </div>

        </div>
      </div>

      {/* Appointment Report */}

      <div className="card shadow-lg border-0 rounded-4 mb-4 report-section">
        <div className="card-body d-flex justify-content-between align-items-center">

          <div>
            <h4 className="fw-bold text-warning">
              <i className="bi bi-calendar-check-fill me-2"></i>
              Appointment Report
            </h4>

            <p className="text-muted mb-0">
              Download appointment schedule and booking details.
            </p>
          </div>

          <div>
            <button
              className="btn btn-danger me-2"
              onClick={() => exportAppointmentsToPDF(appointments)}
            >
              <i className="bi bi-file-earmark-pdf-fill me-2"></i>
              PDF
            </button>

            <button
              className="btn btn-success"
              onClick={() => exportAppointmentsToExcel(appointments)}
            >
              <i className="bi bi-file-earmark-excel-fill me-2"></i>
              Excel
            </button>
          </div>

        </div>
      </div>

      {/* Billing Report */}

      <div className="card shadow-lg border-0 rounded-4 mb-4 report-section">
        <div className="card-body d-flex justify-content-between align-items-center">

          <div>
            <h4 className="fw-bold text-danger">
              <i className="bi bi-receipt-cutoff me-2"></i>
              Billing Report
            </h4>

            <p className="text-muted mb-0">
              Download billing and payment details.
            </p>
          </div>

          <div>
            <button
              className="btn btn-danger me-2"
              onClick={() => exportBillsToPDF(bills)}
            >
              <i className="bi bi-file-earmark-pdf-fill me-2"></i>
              PDF
            </button>

            <button
              className="btn btn-success"
              onClick={() => exportBillsToExcel(bills)}
            >
              <i className="bi bi-file-earmark-excel-fill me-2"></i>
              Excel
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Reports;