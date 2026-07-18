import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  addAppointment,
  updateAppointment,
  getAppointmentById,
} from "../services/appointmentService";

import { getAllPatients } from "../services/patientService";
import { getAllDoctors } from "../services/doctorService";

function AddAppointment() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointment, setAppointment] = useState({
    appointmentDate: "",
    appointmentTime: "",
    status: "Pending",
    patientId: "",
    doctorId: "",
});

  const loadAppointment = useCallback(async () => {
    try {
      const response = await getAppointmentById(id);
      const data = response.data;

      setAppointment({
        appointmentDate: data.appointmentDate ?? data.date ?? "",
        appointmentTime: data.appointmentTime ?? data.time ?? "",
        status: data.status ?? "Pending",
        patientId: data.patient?.patientId ?? data.patient?.id ?? "",
        doctorId: data.doctor?.doctorId ?? data.doctor?.id ?? "",
      });

    } catch (error) {
      console.error(error);
      alert("Failed to load appointment.");
      navigate("/appointments");
    }
  }, [id, navigate]);

  useEffect(() => {
    const initialize = async () => {
      await loadPatients();
      await loadDoctors();

      if (id) {
        await loadAppointment();
      }
    };

    initialize();

  }, [id, loadAppointment]);

  const loadPatients = async () => {
    try {
      const response = await getAllPatients();
      setPatients(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load patients.");
    }
  };

  const loadDoctors = async () => {
    try {
      const response = await getAllDoctors();
      setDoctors(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load doctors.");
    }
  };

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePatientChange = (e) => {
  setAppointment((prev) => ({
    ...prev,
    patientId: e.target.value,
  }));
};

const handleDoctorChange = (e) => {
    setAppointment((prev) => ({
        ...prev,
        doctorId: e.target.value,
    }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();

   if (!appointment.patientId){
      alert("Select Patient");
      return;
    }

    if (!appointment.doctorId) {
      alert("Select Doctor");
      return;
    }

    if (!appointment.appointmentDate) {
      alert("Select Date");
      return;
    }

    if (!appointment.appointmentTime) {
      alert("Select Time");
      return;
    }

  const payload = {
  appointmentDate: appointment.appointmentDate,
  appointmentTime: appointment.appointmentTime,
  status: appointment.status,
  patientId: Number(appointment.patientId),
  doctorId: Number(appointment.doctorId),
};

console.log("Payload:", payload);

try {
  if (id) {
    await updateAppointment(id, payload);
    alert("Appointment Updated Successfully!");
  } else {
    await addAppointment(payload);
    alert("Appointment Booked Successfully!");
  }

  navigate("/appointments");
} catch (error) {
  console.error("Full Error:", error);

  if (error.response) {
    console.log("Status:", error.response.status);
    console.log("Data:", error.response.data);
    console.log("Headers:", error.response.headers);
  } else if (error.request) {
    console.log("Request:", error.request);
  } else {
    console.log("Message:", error.message);
  }
}
  };

  return (
    <div className="container mt-4">
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate("/appointments")}
      >
        ← Back
      </button>

      <div className="card shadow">
        <div className="card-body">
          <h2 className="mb-4">Book Appointment</h2>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Patient</label>
                <select
                  className="form-select"
                  name="patient"
                  value={appointment.patientId}
                  onChange={handlePatientChange}
                >
                  <option value="">Select Patient</option>
                  {patients.map((patient) => (
                    <option
                      key={patient.patientId}
                      value={patient.patientId}
                    >
                      {patient.patientName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label>Doctor</label>
                <select
                  className="form-select"
                  name="doctor"
                  value={appointment.doctorId}
                  onChange={handleDoctorChange}
                >
                  <option value="">Select Doctor</option>
                  {doctors.map((doctor) => (
                    <option
                      key={doctor.doctorId || doctor.id}
                      value={doctor.doctorId || doctor.id}
                    >
                      {doctor.doctorName || doctor.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label>Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="appointmentDate"
                  value={appointment.appointmentDate}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Time</label>
                <input
                  type="time"
                  className="form-control"
                  name="appointmentTime"
                  value={appointment.appointmentTime}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Status</label>
                <select
                  className="form-select"
                  name="status"
                  value={appointment.status}
                  onChange={handleChange}
                >
                  <option>Pending</option>
                  <option>Confirmed</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-success me-2">
              {id ? "Update Appointment" : "Book Appointment"}
            </button>

            <button
              type="reset"
              className="btn btn-secondary"
              onClick={() =>
                setAppointment({
 appointmentDate: "",
 appointmentTime: "",
 status: "Pending",
 patientId: "",
 doctorId: "",
})
              }
            >
              Reset
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddAppointment;

       