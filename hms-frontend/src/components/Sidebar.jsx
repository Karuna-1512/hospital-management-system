import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  FaHospital,
  FaHome,
  FaUserInjured,
  FaUserMd,
  FaCalendarAlt,
  FaFileInvoiceDollar,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaUserCircle
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  return (
    <aside className="sidebar">

      <div className="logo-section">
        <FaHospital className="hospital-icon" />
        <div>
          <h2>H&M Hospital</h2>
          <p>Management System</p>
        </div>
      </div>

      <nav>

        <NavLink to="/dashboard" className="menu">
          <FaHome />
          Dashboard
        </NavLink>

        <NavLink to="/patients" className="menu">
          <FaUserInjured />
          Patients
        </NavLink>

        <NavLink to="/doctors" className="menu">
          <FaUserMd />
          Doctors
        </NavLink>

        <NavLink to="/appointments" className="menu">
          <FaCalendarAlt />
          Appointments
        </NavLink>

        <NavLink to="/billing" className="menu">
          <FaFileInvoiceDollar />
          Billing
        </NavLink>

        <NavLink to="/reports" className="menu">
          <FaChartLine />
          Reports
        </NavLink>

        <NavLink to="/settings" className="menu">
          <FaCog />
          Settings
        </NavLink>

      </nav>

      <div className="sidebar-footer">

        <div className="user">

          <FaUserCircle className="avatar"/>

          <div>
            <h4>Administrator</h4>
            <p>administrator</p>
          </div>

        </div>

       <button
  className="logout"
  onClick={() => {

    localStorage.removeItem("user");

    navigate("/");

  }}
>
  <FaSignOutAlt />
  Logout
</button>

      </div>

    </aside>
  );
}

export default Sidebar;