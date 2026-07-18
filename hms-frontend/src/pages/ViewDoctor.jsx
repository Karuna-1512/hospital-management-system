import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoctorById } from "../services/doctorService";

function ViewDoctor() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    loadDoctor();
  }, []);

  const loadDoctor = async () => {
    try {
      const response = await getDoctorById(id);
      setDoctor(response.data);
    } catch (error) {
      console.error(error);
      alert("Doctor not found.");
      navigate("/doctors");
    }
  };

  if (!doctor) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <div className="container mt-4">

      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate("/doctors")}
      >
        ← Back
      </button>

      <div className="card shadow">

        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Doctor Details</h3>
        </div>

        <div className="card-body">

          <table className="table table-bordered">

            <tbody>

              <tr>
                <th>ID</th>
                <td>{doctor.doctorId || doctor.id}</td>
              </tr>

              <tr>
                <th>Name</th>
                <td>{doctor.doctorName || doctor.name}</td>
              </tr>

              <tr>
                <th>Specialization</th>
                <td>{doctor.specialization}</td>
              </tr>

              <tr>
                <th>Department</th>
                <td>{doctor.department}</td>
              </tr>

              <tr>
                <th>Experience</th>
                <td>{doctor.experience} Years</td>
              </tr>

              <tr>
                <th>Phone</th>
                <td>{doctor.phone}</td>
              </tr>

              <tr>
                <th>Email</th>
                <td>{doctor.email}</td>
              </tr>

              <tr>
                <th>Consultation Fee</th>
                <td>₹ {doctor.fee}</td>
              </tr>

            </tbody>

          </table>

          <button
            className="btn btn-warning"
            onClick={() => navigate(`/edit-doctor/${doctor.doctorId}`)}
          >
            Edit Doctor
          </button>

        </div>

      </div>

    </div>
  );
}

export default ViewDoctor;