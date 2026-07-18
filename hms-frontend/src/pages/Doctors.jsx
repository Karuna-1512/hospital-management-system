import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllDoctors,
  deleteDoctor,
} from "../services/doctorService";

function Doctors() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
  try {
    const response = await getAllDoctors();

    console.log("Doctors from Backend:", response.data);

    // Normalize different backend response shapes
    const payload = response && response.data ? response.data : [];
    const list = Array.isArray(payload)
      ? payload
      : Array.isArray(payload.data)
      ? payload.data
      : Array.isArray(payload.doctors)
      ? payload.doctors
      : Array.isArray(payload.content)
      ? payload.content
      : [];

    setDoctors(list);
  } catch (error) {
    console.error(error);
    alert("Failed to load doctors");
  }
};

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this doctor?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoctor(id);
      loadDoctors();
      alert("Doctor deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to delete doctor.");
    }
  };

  const filteredDoctors = doctors.filter((doctor) =>
    (doctor.doctorName || doctor.name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>

      <div className="page-header">
        <div>
          <h2>Doctors</h2>
          <p>Manage hospital doctors and medical staff</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/add-doctor")}
        >
          + Add Doctor
        </button>
      </div>

      <div className="table-card">

        <div className="table-header">
          <input
            type="text"
            className="search-box"
            placeholder="Search Doctor Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <table className="table table-bordered table-hover">
      <thead className="table-primary">
  <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Specialization</th>
    <th>Department</th>
    <th>Experience</th>
    <th>Phone</th>
    <th>Email</th>
    <th>Fee</th>
    <th>Actions</th>
  </tr>
</thead>

<tbody>
        {filteredDoctors.length > 0 ? (
    filteredDoctors.map((doctor) => (
      <tr key={doctor.doctorId || doctor.id}>
        <td>{doctor.doctorId || doctor.id || "-"}</td>
        <td>{doctor.doctorName || doctor.name || "-"}</td>
        <td>{doctor.specialization || doctor.speciality || "-"}</td>
        <td>{doctor.department || "-"}</td>
        <td>{doctor.experience || "-"}</td>
        <td>{doctor.phone || "-"}</td>
        <td>{doctor.email || "-"}</td>
        <td>{doctor.fee || "-"}</td>

        <td>
          <button
            className="btn btn-success btn-sm me-2"
            onClick={() => navigate(`/view-doctor/${doctor.doctorId}`)}
          >
            View
          </button>

          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => navigate(`/edit-doctor/${doctor.doctorId}`)}
          >
            Edit
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(doctor.doctorId)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="9" className="text-center">
        No Doctors Found
      </td>
    </tr>
  )}
</tbody>
  </table>

      </div>

    </div>
  );
}

export default Doctors;