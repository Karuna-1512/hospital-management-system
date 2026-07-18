import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllPatients } from "./services/patientService";
import { getAllDoctors } from "./services/doctorService";
import Layout from "./components/Layout";
import { getAllBills } from "./services/billingService";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import AddPatient from "./pages/AddPatient";
import ViewPatient from "./pages/ViewPatient";
import Doctors from "./pages/Doctors";
import AddDoctor from "./pages/AddDoctor";
import ViewDoctor from "./pages/ViewDoctor";
import Appointments from "./pages/Appointments";
import AddAppointment from "./pages/AddAppointment";

import ViewAppointment from "./pages/ViewAppointment";
import Billing from "./pages/Billing";
import AddBilling from "./pages/AddBilling";
import ViewBilling from "./pages/ViewBilling";
import EditBilling from "./pages/EditBilling";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function App() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments] = useState([]);
  const [bills, setBills] = useState([]);
  useEffect(() => {
  loadPatients();
  loadDoctors();
  loadBills();
}, []);

const loadPatients = async () => {
  try {
    const response = await getAllPatients();
    setPatients(response.data);
  } catch (error) {
    console.error(error);
  }
};

const loadDoctors = async () => {
  try {
    const response = await getAllDoctors();
    setDoctors(response.data);
  } catch (error) {
    console.error(error);
  }
};
const loadBills = async () => {
  try {
    const response = await getAllBills();
    setBills(response.data);
  } catch (error) {
    console.error(error);
  }
};
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Dashboard */}
<Route
  path="/dashboard"
  element={
    <Layout>
      <Dashboard bills={bills} />
    </Layout>
  }
/>
<Route
  path="/add-doctor"
  element={
    <Layout>
      <AddDoctor />
    </Layout>
  }
/>

<Route
  path="/edit-doctor/:id"
  element={
    <Layout>
      <AddDoctor />
    </Layout>
  }
/>
<Route
  path="/view-doctor/:id"
  element={
    <Layout>
      <ViewDoctor />
    </Layout>
  }
/>

<Route
  path="/add-appointment"
  element={
    <Layout>
      <AddAppointment />
    </Layout>
  }
/>
<Route
  path="/edit-appointment/:id"
  element={
    <Layout>
      <AddAppointment />
    </Layout>
  }
/>

<Route
  path="/view-appointment/:id"
  element={
    <Layout>
      <ViewAppointment />
    </Layout>
  }
/>
        {/* Patients */}
      <Route
  path="/patients"
  element={
    <Layout>
      <Patients />
    </Layout>
  }
/>
        {/* Add Patient */}
        <Route
          path="/add-patient"
          element={
            <Layout>
              <AddPatient />
            </Layout>
          }
        />
        <Route
  path="/view-patient/:id"
  element={
    <Layout>
      <ViewPatient />
    </Layout>
  }
/>
      <Route
  path="/edit-patient/:id"
  element={
    <Layout>
      <AddPatient />
    </Layout>
  }
/>

        {/* Doctors */}
        <Route
  path="/doctors"
  element={
    <Layout>
      <Doctors />
    </Layout>
  }
/>



        {/* Appointments */}
       <Route
  path="/appointments"
  element={
    <Layout>
      <Appointments />
    </Layout>
  }
/>

        {/* Billing */}
     <Route
 path="/billing"
 element={
  <Layout>
    <Billing
      bills={bills}
      setBills={setBills}
    />
  </Layout>
 }
/>

<Route
  path="/add-billing"
  element={
    <Layout>
      <AddBilling
        bills={bills}
        setBills={setBills}
      />
    </Layout>
  }
/>

<Route
 path="/view-billing/:id"
 element={
  <Layout>
    <ViewBilling
      bills={bills}
    />
  </Layout>
 }
/>


<Route
 path="/edit-billing/:id"
 element={
  <Layout>
    <EditBilling
      bills={bills}
      setBills={setBills}
    />
  </Layout>
 }
/>

        {/* Reports */}
       <Route
  path="/reports"
  element={
    <Layout>
      <Reports
        patients={patients}
        doctors={doctors}
        appointments={appointments}
        bills={bills}
      />
    </Layout>
  }
/>
        {/* Settings */}
        <Route
          path="/settings"
          element={
            <Layout>
              <Settings />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;