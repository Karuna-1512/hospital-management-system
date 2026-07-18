import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addBill } from "../services/billingService";
import { getAllPatients } from "../services/patientService";
import { getAllDoctors } from "../services/doctorService";

function AddBilling() {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [bill, setBill] = useState({
    patientName: "",
    doctorName: "",
    date: "",
    consultationFee: "",
    medicineCharges: "",
    labCharges: "",
    roomCharges: "",
    amount: "",
    status: "",
  });

  useEffect(() => {
    loadPatients();
    loadDoctors();
  }, []);

  const loadPatients = async () => {
    try {
      const response = await getAllPatients();
      console.log("Patients:", response.data);
      setPatients(response.data);
    } catch (error) {
      console.error("Error loading patients:", error);
    }
  };

  const loadDoctors = async () => {
    try {
      const response = await getAllDoctors();
      console.log("Doctors:", response.data);
      setDoctors(response.data);
    } catch (error) {
      console.error("Error loading doctors:", error);
    }
  };

  const handleChange = (e) => {
    setBill({
      ...bill,
      [e.target.name]: e.target.value,
    });
  };

  const calculateTotal = () => {
    const total =
      Number(bill.consultationFee || 0) +
      Number(bill.medicineCharges || 0) +
      Number(bill.labCharges || 0) +
      Number(bill.roomCharges || 0);

    setBill((prev) => ({
      ...prev,
      amount: total,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bill.patientName) {
      alert("Please select a patient.");
      return;
    }

    if (!bill.doctorName) {
      alert("Please select a doctor.");
      return;
    }

    const billData = {
      patientName: bill.patientName,
      doctorName: bill.doctorName,
      date: bill.date,
      consultationFee: Number(bill.consultationFee),
      medicineCharges: Number(bill.medicineCharges),
      labCharges: Number(bill.labCharges),
      roomCharges: Number(bill.roomCharges),
      totalAmount: Number(bill.amount),
      paymentStatus: bill.status,
    };

    try {
      await addBill(billData);
      alert("Bill created successfully!");
      navigate("/billing");
    } catch (error) {
  console.error(error);

  console.log("Response:", error.response);
  console.log("Data:", error.response?.data);

  alert(error.response?.data || "Failed to save bill");
}
  };
console.log("Patients State:", patients);
console.log("Doctors State:", doctors);
  return (
        <div className="container mt-4">
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate("/billing")}
      >
        ← Back
      </button>

      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3>Create Billing</h3>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">

              {/* Patient */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Patient Name</label>
                <select
                  className="form-select"
                  name="patientName"
                  value={bill.patientName}
                  onChange={handleChange}
                >
                  <option value="">Select Patient</option>

                  {patients.map((patient) => (
                    <option
                      key={patient.patientId}
                      value={patient.patientName}
                    >
                      {patient.patientName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Doctor */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Doctor Name</label>
                <select
                  className="form-select"
                  name="doctorName"
                  value={bill.doctorName}
                  onChange={handleChange}
                >
                  <option value="">Select Doctor</option>

                  {doctors.map((doctor) => (
                    <option
                      key={doctor.doctorId}
                      value={doctor.doctorName}
                    >
                      {doctor.doctorName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={bill.date}
                  onChange={handleChange}
                />
              </div>

              {/* Consultation Fee */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Consultation Fee</label>
                <input
                  type="number"
                  className="form-control"
                  name="consultationFee"
                  value={bill.consultationFee}
                  onChange={handleChange}
                />
              </div>

              {/* Medicine Charges */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Medicine Charges</label>
                <input
                  type="number"
                  className="form-control"
                  name="medicineCharges"
                  value={bill.medicineCharges}
                  onChange={handleChange}
                />
              </div>

              {/* Lab Charges */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Lab Charges</label>
                <input
                  type="number"
                  className="form-control"
                  name="labCharges"
                  value={bill.labCharges}
                  onChange={handleChange}
                />
              </div>

              {/* Room Charges */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Room Charges</label>
                <input
                  type="number"
                  className="form-control"
                  name="roomCharges"
                  value={bill.roomCharges}
                  onChange={handleChange}
                />
              </div>

              {/* Total Amount */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Total Amount</label>
                <input
                  type="number"
                  className="form-control"
                  value={bill.amount}
                  readOnly
                />
              </div>
            </div>

            <button
              type="button"
              className="btn btn-info me-2"
              onClick={calculateTotal}
            >
              Calculate Total
            </button>

            <div className="mt-3 mb-3">
              <label className="form-label">Payment Status</label>
              <select
                className="form-select"
                name="status"
                value={bill.status}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-success"
            >
              Save Bill
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBilling;