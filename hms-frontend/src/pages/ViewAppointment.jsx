import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAppointmentById } from "../services/appointmentService";

function ViewAppointment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [appointment, setAppointment] = useState(
    location.state?.appointment || null
  );

  useEffect(() => {
    const load = async () => {
      if (!appointment && id) {
        try {
          const res = await getAppointmentById(id);
          setAppointment(res.data);
        } catch (err) {
          console.error(err);
        }
      }
    };

    load();
  }, [appointment, id]);

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

  const idVal = appointment.appointmentId || appointment.id || appointment.appointmentId;
  const patientName = appointment.patient?.patientName || appointment.patient || appointment.patientName;
  const doctorName = appointment.doctor?.doctorName || appointment.doctor || appointment.doctorName;
  const date = appointment.appointmentDate || appointment.date || "";
  const time = appointment.appointmentTime || appointment.time || "";
  const status = appointment.status || "";

  return (
    <div className="container">

      <h2 className="mb-4">Appointment Details</h2>

      <table className="table table-bordered">

        <tbody>

          <tr>
            <th>ID</th>
            <td>{idVal}</td>
          </tr>

          <tr>
            <th>Patient</th>
            <td>{patientName}</td>
          </tr>

          <tr>
            <th>Doctor</th>
            <td>{doctorName}</td>
          </tr>

          <tr>
            <th>Date</th>
            <td>{date}</td>
          </tr>

          <tr>
            <th>Time</th>
            <td>{time}</td>
          </tr>

          <tr>
            <th>Status</th>
            <td>
              <span
                className={`badge ${
                  status === "Confirmed"
                    ? "bg-success"
                    : status === "Pending"
                    ? "bg-warning text-dark"
                    : "bg-secondary"
                }`}
              >
                {status}
              </span>
            </td>
          </tr>

        </tbody>

      </table>

      <button
        className="btn btn-secondary"
        onClick={() => navigate("/appointments")}
      >
        Back
      </button>

    </div>
  );
}

export default ViewAppointment;