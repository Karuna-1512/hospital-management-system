import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getAllAppointments,
  deleteAppointment,
} from "../services/appointmentService";

function Appointments() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const response = await getAllAppointments();
      setAppointments(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load appointments.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this appointment?")) return;

    try {
      await deleteAppointment(id);
      loadAppointments();
    } catch (error) {
      console.error(error);
      alert("Delete failed.");
    }
  };

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.patient?.patientName
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );
  return (
    <div>

      <div className="page-header">
        <div>
          <h2>Appointments</h2>
          <p>Manage patient appointments and schedules</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/add-appointment")}
        >
          + Book Appointment
        </button>
      </div>

      <div className="table-card">

        <div className="table-header">
          <input
            type="text"
            className="search-box"
            placeholder="Search Patient Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <table className="table table-bordered table-hover">

        <thead className="table-primary">
          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

      <tbody>
  {filteredAppointments.length > 0 ? (
    filteredAppointments.map((appointment) => (
      <tr key={appointment.appointmentId}>
        <td>{appointment.appointmentId}</td>

        <td>{appointment.patient?.patientName}</td>

        <td>{appointment.doctor?.doctorName}</td>

        <td>{appointment.appointmentDate}</td>

        <td>{appointment.appointmentTime}</td>

        <td>
          <span
            className={`badge ${
              appointment.status === "Confirmed"
                ? "bg-success"
                : appointment.status === "Pending"
                ? "bg-warning text-dark"
                : appointment.status === "Completed"
                ? "bg-primary"
                : "bg-danger"
            }`}
          >
            {appointment.status}
          </span>
        </td>

        <td>
          <button
            className="btn btn-success btn-sm me-2"
            onClick={() =>
              navigate(`/view-appointment/${appointment.appointmentId}`, {
                state: { appointment },
              })
            }
          >
            View
          </button>

          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() =>
              navigate(`/edit-appointment/${appointment.appointmentId}`)
            }
          >
            Edit
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={() =>
              handleDelete(appointment.appointmentId)
            }
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7" className="text-center">
        No appointments found.
      </td>
    </tr>
  )}
</tbody>

      </table>

      </div>

    </div>
  );
}

export default Appointments;