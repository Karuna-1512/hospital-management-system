import { FaBell, FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">

      <h2>H&M Hospital Management System</h2>

      <div className="navbar-right">

        <FaBell className="nav-icon"/>

        <div className="profile">

          <FaUserCircle className="profile-icon"/>

          <div>
            <h4>Administrator</h4>
            <small>System Admin</small>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;