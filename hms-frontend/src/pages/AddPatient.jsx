import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addPatient,
  updatePatient,
  getPatientById,
} from "../services/patientService";

function AddPatient() {

  const navigate = useNavigate();
const { id } = useParams();
const [patient,setPatient]=useState({
 patientName: "",
 age:"",
 gender:"",
 bloodGroup:"",
 phone:"",
 email:"",
 address:""
});


// const {id}=useParams();

useEffect(() => {
  if (id) {
    loadPatient();
  }
}, [id]);

const loadPatient = async () => {
  try {
    const response = await getPatientById(id);
    setPatient(response.data);
  } catch (error) {
    console.error(error);
  }
};

  const handleChange = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (patient.patientName.trim() === "") {
      alert("Patient Name is required");
      return;
    }

    if (patient.age === "") {
      alert("Age is required");
      return;
    }

    if (patient.gender === "") {
      alert("Please select Gender");
      return;
    }

    if (patient.bloodGroup === "") {
      alert("Please select Blood Group");
      return;
    }

    if (patient.phone.length !== 10) {
      alert("Phone number must be 10 digits");
      return;
    }

    if (!patient.email.includes("@")) {
      alert("Enter a valid Email");
      return;
    }

    if (patient.address.trim() === "") {
      alert("Address is required");
      return;
    }

   try {
  if (id) {
    await updatePatient(id, patient);
    alert("Patient Updated Successfully!");
  } else {
    await addPatient(patient);
    alert("Patient Added Successfully!");
  }

  navigate("/patients");
} catch (error) {
  console.error(error);
  alert("Operation Failed!");
}

  };

  return (
    <div className="container mt-4">

      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate("/patients")}
      >
        ← Back
      </button>

      <div className="card shadow">

        <div className="card-body">

          <h2 className="mb-4">Add Patient</h2>

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-6 mb-3">

                <label>Patient Name</label>

                <input
                  type="text"
                  className="form-control"
                  name="patientName"
                  value={patient.patientName}
                  onChange={handleChange}
                />

              </div>

              <div className="col-md-6 mb-3">

                <label>Age</label>

                <input
                  type="number"
                  className="form-control"
                  name="age"
                  value={patient.age}
                  onChange={handleChange}
                />

              </div>

              <div className="col-md-6 mb-3">

                <label>Gender</label>

                <select
                  className="form-select"
                  name="gender"
                  value={patient.gender}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>

              </div>

              <div className="col-md-6 mb-3">

                <label>Blood Group</label>

                <select
                  className="form-select"
                  name="bloodGroup"
                  value={patient.bloodGroup}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option>A+</option>
                  <option>B+</option>
                  <option>AB+</option>
                  <option>O+</option>
                  <option>A-</option>
                  <option>B-</option>
                  <option>AB-</option>
                  <option>O-</option>
                </select>

              </div>

              <div className="col-md-6 mb-3">

                <label>Phone</label>

                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  maxLength="10"
                  value={patient.phone}
                  onChange={handleChange}
                />

              </div>

              <div className="col-md-6 mb-3">

                <label>Email</label>

                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={patient.email}
                  onChange={handleChange}
                />

              </div>

              <div className="col-12 mb-3">

                <label>Address</label>

                <textarea
                  className="form-control"
                  rows="3"
                  name="address"
                  value={patient.address}
                  onChange={handleChange}
                ></textarea>

              </div>

            </div>

            <button
              type="submit"
              className="btn btn-success me-2"
            >
              Save
            </button>

            <button
              type="reset"
              className="btn btn-secondary"
            >
              Reset
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}
export default AddPatient;