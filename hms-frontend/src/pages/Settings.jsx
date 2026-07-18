import React, { useState, useEffect } from "react";

import "./Settings.css";
function Settings() {
const [admin, setAdmin] = useState({
  username: "",
});

  const [hospital, setHospital] = useState({

    hospitalName: "H&M Hospital",
    email: "",
    phone: "",
    address: "",
    adminName: "Administrator"

  });



  const handleChange = (e)=>{

    setHospital({

      ...hospital,

      [e.target.name]: e.target.value

    });

  };



  const handleSubmit=(e)=>{

    e.preventDefault();

    alert("Settings Updated Successfully");

  };



useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    setAdmin(user);

    setHospital((prev) => ({
      ...prev,
      adminName: user.username || "",
    }));
  }
}, []);

  return (
  <div className="container py-4">

    <div className="row">

      {/* Left Profile Card */}

      <div className="col-lg-4 mb-4">

        <div className="card shadow border-0 rounded-4">

          <div
            className="card-header text-center text-white"
            style={{
              background:
                "linear-gradient(90deg,#0d6efd,#0dcaf0)"
            }}
          >
            <h3>🏥 H&M Hospital</h3>
          </div>

          <div className="card-body text-center">

            <img
              src="https://cdn-icons-png.flaticon.com/512/2967/2967350.png"
              alt="Hospital"
              width="110"
            />

            <h4 className="mt-3">{admin.username}</h4>

            <span className="badge bg-success">
              System Administrator
            </span>

            <hr />

            <p className="text-muted mb-1">
              Manage hospital information
            </p>

            <p className="text-muted">
              Update contact details and settings.
            </p>

          </div>

        </div>

      </div>

      {/* Settings Form */}

      <div className="col-lg-8">

        <div className="card shadow border-0 rounded-4">

          <div
            className="card-header text-white"
            style={{
              background:
                "linear-gradient(90deg,#0d6efd,#0dcaf0)"
            }}
          >
            <h4 className="mb-0">
              ⚙ Hospital Settings
            </h4>
          </div>

          <div className="card-body">

            <form onSubmit={handleSubmit}>

              <div className="row">

                <div className="col-md-6 mb-3">
                  <label className="fw-bold">
                    🏥 Hospital Name
                  </label>

                  <input
                    type="text"
                    className="form-control rounded-pill"
                    name="hospitalName"
                    value={hospital.hospitalName}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="fw-bold">
                    👤 Administrator
                  </label>

                  <input
                    className="form-control rounded-pill"
                    value={admin.username}
                    readOnly
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="fw-bold">
                    📧 Email
                  </label>

                  <input
                    type="email"
                    className="form-control rounded-pill"
                    name="email"
                    value={hospital.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="fw-bold">
                    📞 Phone
                  </label>

                  <input
                    className="form-control rounded-pill"
                    name="phone"
                    value={hospital.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 mb-4">
                  <label className="fw-bold">
                    📍 Address
                  </label>

                  <textarea
                    rows="4"
                    className="form-control rounded-4"
                    name="address"
                    value={hospital.address}
                    onChange={handleChange}
                  />
                </div>

              </div>

              <div className="text-end">

                <button
                  className="btn btn-success btn-lg px-5 rounded-pill"
                >
                  💾 Save Settings
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>

  </div>
);
}


export default Settings;