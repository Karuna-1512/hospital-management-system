import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import {loginUser} from "../services/authService";
import {
  FaHospital,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserShield,
  FaUserInjured,
  FaUserMd,
  FaCalendarCheck,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async(e)=>{

e.preventDefault();


try{

const response =
await loginUser({
username,
password
});
console.log("Login Response:", response.data);
if(response.data){

localStorage.setItem(
"user",
JSON.stringify(response.data)
);


navigate("/dashboard");

}
else{

alert("Invalid Username or Password");

}


}catch (error) {
  console.log(error);
  console.log(error.response);
  console.log(error.response?.data);

  alert(error.response?.data || "Login Failed");
}


}

  return (
    <div className="login-page">

      {/* Left Section */}

      <div className="login-left">

        <div className="brand">

          <FaHospital className="hospital-icon" />

          <h1>H&amp;M Hospital</h1>

          <h3>Hospital Management System</h3>

          <p>
            A modern healthcare solution for managing patients,
            doctors, appointments, billing and reports efficiently.
          </p>

        </div>

        <div className="features">

  <div className="feature-card">
    <FaUserInjured style={{ marginRight: "10px" }} />
    Patient Management
  </div>

  <div className="feature-card">
    <FaUserMd style={{ marginRight: "10px" }} />
    Doctor Management
  </div>

  <div className="feature-card">
    <FaCalendarCheck style={{ marginRight: "10px" }} />
    Appointment Scheduling
  </div>

  <div className="feature-card">
    <FaFileInvoiceDollar style={{ marginRight: "10px" }} />
    Billing & Reports
  </div>

</div>

      </div>

      {/* Right Section */}

      <div className="login-right">

        <div className="login-card">

          <div className="login-header">

            <FaUserShield className="admin-icon" />

            <h2>Administrator Login</h2>

            <p>Sign in to continue</p>

          </div>

          <form onSubmit={handleLogin}>

            {/* Email */}

            <div className="input-group-custom">

              <FaEnvelope className="input-icon" />

              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                required
              />

            </div>

            {/* Password */}

            <div className="input-group-custom">

              <FaLock className="input-icon" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

              <span
                className="eye-icon"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                 )}
              </span>

            </div>

            {/* Remember */}

            <div className="login-options">

              <label>

                <input type="checkbox" />

                Remember Me

              </label>

              <a href="/">Forgot Password?</a>

            </div>

            {/* Login */}

            <button
              type="submit"
              className="login-btn"
            >
              Login to Dashboard
            </button>

          </form>

          <div className="login-footer">

            © 2026 H&amp;M Hospital

            <br />

            Hospital Management System

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;