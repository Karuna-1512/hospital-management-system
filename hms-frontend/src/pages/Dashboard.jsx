import { useEffect, useState } from "react";
import { getDashboard, getAppointments } from "../services/dashboardService";
import "./Dashboard.css";

function Dashboard() {

    const [dashboard, setDashboard] = useState({
        totalPatients: 0,
        totalDoctors: 0,
        totalAppointments: 0,
        totalBills: 0
    });

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {

        loadDashboard();
        loadAppointments();

    }, []);

    const loadDashboard = async () => {

        try {

            const response = await getDashboard();
            setDashboard(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const loadAppointments = async () => {

        try {

            const response = await getAppointments();
            setAppointments(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div>

            <div className="page-header">
                <div>
                    <h2>Dashboard</h2>
                    <p>Welcome back! Here's your hospital overview</p>
                </div>
            </div>

            <div className="row g-4 mb-4">

                <div className="col-md-3">
                    <div className="card dashboard-card patient-card">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="text-uppercase">Total Patients</h6>
                                <h2 className="fw-bold">{dashboard.totalPatients || 0}</h2>
                            </div>
                            <i className="bi bi-people-fill display-4"></i>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card dashboard-card doctor-card">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="text-uppercase">Doctors</h6>
                                <h2 className="fw-bold">{dashboard.totalDoctors || 0}</h2>
                            </div>
                            <i className="bi bi-person-badge-fill display-4"></i>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card dashboard-card appointment-card">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="text-uppercase">Appointments</h6>
                                <h2 className="fw-bold">{dashboard.totalAppointments || 0}</h2>
                            </div>
                            <i className="bi bi-calendar-check-fill display-4"></i>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card dashboard-card bill-card">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="text-uppercase">Bills</h6>
                                <h2 className="fw-bold">{dashboard.totalBills || 0}</h2>
                            </div>
                            <i className="bi bi-receipt-cutoff display-4"></i>
                        </div>
                    </div>
                </div>

            </div>

            <h3 style={{ marginTop: "40px", fontWeight: "700", marginBottom: "20px" }}>
                Recent Appointments
            </h3>

            <div className="table-card">

                <table className="table table-bordered table-hover">

                <thead className="table-primary">

                    <tr>
                        <th>ID</th>
                        <th>Patient</th>
                        <th>Doctor</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>

                </thead>

                <tbody>

                    {
                        appointments.length > 0 ?

                            appointments.slice(0, 5).map((appointment) => (

                                <tr key={appointment.appointmentId}>

                                    <td>{appointment.appointmentId}</td>

                                    <td>{appointment.patient?.patientName || appointment.patientName}</td>

                                    <td>{appointment.doctor?.doctorName || appointment.doctorName}</td>

                                    <td>{appointment.appointmentDate}</td>

                                    <td>{appointment.status}</td>

                                </tr>

                            ))

                            :

                            <tr>

                                <td colSpan="5" className="text-center">

                                    No Appointments Found

                                </td>

                            </tr>

                    }

                </tbody>

            </table>

            </div>

        </div>

    );

}

export default Dashboard;