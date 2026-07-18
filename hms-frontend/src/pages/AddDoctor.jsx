import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  addDoctor,
  updateDoctor,
  getDoctorById
} from "../services/doctorService";
function AddDoctor() {

  const navigate = useNavigate();
  const { id } = useParams();

const [doctor, setDoctor] = useState({
  doctorName: "",
  specialization: "",
  experience: "",
  phone: "",
  email: "",
  department: "",
  fee: ""
});

  const handleChange = (e) => {
    setDoctor({
      ...doctor,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
    e.preventDefault();

    if (doctor.doctorName.trim() === "") {
      alert("Doctor Name is required");
      return;
    }

    if (doctor.specialization.trim() === "") {
      alert("Specialization is required");
      return;
    }

    if (!doctor.phone || doctor.phone.length !== 10) {
      alert("Phone number must be 10 digits");
      return;
    }

    if (doctor.department.trim() === "") {
      alert("Department is required");
      return;
    }

    if (doctor.fee === "") {
      alert("Consultation fee is required");
      return;
    }
try {

    if (id) {
        await updateDoctor(id, doctor);
        alert("Doctor Updated Successfully!");
    } else {
        await addDoctor(doctor);
        alert("Doctor Added Successfully!");
    }

    navigate("/doctors");

  } catch (error) {
    console.error(error);
    alert("Operation Failed!");
  }
};

useEffect(() => {
  if (id) {
    loadDoctor();
  }
}, [id]);

const loadDoctor = async () => {
  try {
    const response = await getDoctorById(id);
    setDoctor(response.data);
  } catch (error) {
    console.error(error);
  }
};
  return (
    <div className="container mt-4">

      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate("/doctors")}
      >
        ← Back
      </button>

      <div className="card shadow">

        <div className="card-body">

          <h2 className="mb-4">
  {id ? "Edit Doctor" : "Add Doctor"}
</h2>

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label>Doctor Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="doctorName"
                  value={doctor.doctorName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Specialization</label>
                <input
                  type="text"
                  className="form-control"
                  name="specialization"
                  value={doctor.specialization}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Experience</label>
                <input
                  type="number"
                  className="form-control"
                  name="experience"
                  min="0"
                  max="50"
                  step="1"
                  value={doctor.experience}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Qualification</label>
                <input
                  type="text"
                  className="form-control"
                  name="qualification"
                  value={doctor.qualification}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  maxLength="10"
                  value={doctor.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={doctor.email}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Department</label>
                <input
                  type="text"
                  className="form-control"
                  name="department"
                  value={doctor.department}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Consultation Fee</label>
                <input
                  type="number"
                  className="form-control"
                  name="fee"
                  value={doctor.fee}
                  onChange={handleChange}
                />
              </div>

            </div>

            <button
  type="submit"
  className="btn btn-success me-2"
>
  {id ? "Update Doctor" : "Save"}
</button>

            <button
  type="button"
  className="btn btn-secondary"
  onClick={() =>
    setDoctor({
      doctorName: "",
      specialization: "",
      experience: "",
      phone: "",
      email: "",
      department: "",
      fee: ""
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

export default AddDoctor;