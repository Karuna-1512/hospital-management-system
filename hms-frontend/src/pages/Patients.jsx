import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllPatients,
  deletePatient,
} from "../services/patientService";
function Patients() {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState([]);
useEffect(() => {
  loadPatients();
}, []);

const loadPatients = async () => {
  try {
    const response = await getAllPatients();
    setPatients(response.data);
  } catch (error) {
    console.error(error);
  }
};
const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this patient?"
  );

  if (!confirmDelete) return;

  try {
    await deletePatient(id);
    loadPatients();
  } catch (error) {
    console.error(error);
  }
};


  const filteredPatients = patients.filter((patient) =>
    patient.patientName
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );


  return (

    <div>

      <div className="page-header">
        <div>
          <h2>Patients</h2>
          <p>Manage all hospital patients and medical records</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() =>
            navigate("/add-patient")
          }
        >
          + Add Patient
        </button>
      </div>

      <div className="table-card">

        <div className="table-header">
          <input
            type="text"
            className="search-box"
            placeholder="Search Patient Name..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <table className="table table-bordered table-hover">


        <thead className="table-primary">

          <tr>

            <th>ID</th>

            <th>Name</th>

            <th>Age</th>

            <th>Gender</th>

            <th>Blood Group</th>

            <th>Phone</th>

            <th>Email</th>

            <th>Actions</th>

          </tr>

        </thead>



        <tbody>


          {
            filteredPatients.length > 0 ? (


              filteredPatients.map((patient) => (

                <tr key={patient.patientId}>


                  <td>
                    {patient.patientId}
                  </td>


                  <td>
                    {patient.patientName}
                  </td>


                  <td>
                    {patient.age}
                  </td>


                  <td>
                    {patient.gender}
                  </td>


                  <td>
                    {patient.bloodGroup}
                  </td>


                  <td>
                    {patient.phone}
                  </td>


                  <td>
                    {patient.email}
                  </td>


                  <td>


                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() =>
                        navigate(`/view-patient/${patient.patientId}`)
                      }
                    >
                      View
                    </button>



                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() =>
                        navigate(`/edit-patient/${patient.patientId}`)
                      }
                    >
                      Edit
                    </button>



                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleDelete(patient.patientId)
                      }
                    >
                      Delete
                    </button>


                  </td>


                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="8"
                  className="text-center"
                >
                  No Patients Found
                </td>

              </tr>

            )
          }


        </tbody>


      </table>

      </div>

    </div>

  );

}
export default Patients;