import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function EditAppointment({ appointments, setAppointments }) {
  const navigate = useNavigate();
  const location = useLocation();

  const appointment = location.state?.appointment;

  const [formData, setFormData] = useState({
    id: appointment?.id || "",
    patient: appointment?.patient || "",
    doctor: appointment?.doctor || "",
    date: appointment?.date || "",
    time: appointment?.time || "",
    status: appointment?.status || "Pending",
  });

  if (!appointment) {
    return (
      <div className="container mt-4">
        <h3>No Appointment Found</h3>

        <button
          className="btn btn-secondary mt-3"
          onClick={() => navigate("/appointments")}
        >
          Back
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedAppointments = appointments.map((item) =>
      item.id === formData.id ? formData : item
    );

    setAppointments(updatedAppointments);

    alert("Appointment updated successfully!");

    navigate("/appointments");
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">Edit Appointment</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="form-label">Patient</label>
          <input
            type="text"
            className="form-control"
            name="patient"
            value={formData.patient}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Doctor</label>
          <input
            type="text"
            className="form-control"
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Time</label>
          <input
            type="time"
            className="form-control"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>

          <select
            className="form-select"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary me-2">
          Update Appointment
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/appointments")}
        >
          Cancel
        </button>

      </form>

    </div>
  );
}

export default EditAppointment;