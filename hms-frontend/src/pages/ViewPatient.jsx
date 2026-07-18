import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPatientById } from "../services/patientService";

function ViewPatient() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPatient();
  }, []);

  const loadPatient = async () => {
    try {
      const response = await getPatientById(id);
      setPatient(response.data);
    } catch (error) {
      console.error("Error fetching patient:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <h4>Loading...</h4>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          Patient Not Found
        </div>

        <button
          className="btn btn-secondary"
          onClick={() => navigate("/patients")}
        >
          ← Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">

      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate("/patients")}
      >
        ← Back
      </button>

      <div className="card shadow">

        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Patient Details</h3>
        </div>

        <div className="card-body">

          <div className="row">

            <div className="col-md-6 mb-3">
              <strong>Patient ID:</strong>
              <p>{patient.patientId}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Name:</strong>
              <p>{patient.patientName}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Age:</strong>
              <p>{patient.age}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Gender:</strong>
              <p>{patient.gender}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Blood Group:</strong>
              <p>{patient.bloodGroup}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Phone:</strong>
              <p>{patient.phone}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Email:</strong>
              <p>{patient.email}</p>
            </div>

            <div className="col-12 mb-3">
              <strong>Address:</strong>
              <p>{patient.address}</p>
            </div>

          </div>

          <button
            className="btn btn-warning"
            onClick={() =>
              navigate(`/edit-patient/${patient.patientId}`)
            }
          >
            Edit Patient
          </button>

        </div>

      </div>

    </div>
  );
}

export default ViewPatient;