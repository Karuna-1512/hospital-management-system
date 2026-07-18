import React from "react";
import { useNavigate, useParams } from "react-router-dom";


function ViewBilling({ bills }) {

  const navigate = useNavigate();

  const { id } = useParams();


  const bill = bills.find(
  (b) => b.billId === Number(id)
);


  if (!bill) {

    return (
      <div className="container mt-4">

        <div className="alert alert-danger">
          Billing Record Not Found
        </div>

        <button
          className="btn btn-secondary"
          onClick={() => navigate("/billing")}
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
        onClick={() => navigate("/billing")}
      >
        ← Back
      </button>


      <div className="card shadow">


        <div className="card-header bg-primary text-white">

          <h3>
            Billing Details
          </h3>

        </div>



        <div className="card-body">


          <p>
            <strong>Bill ID:</strong> {bill.billId}
          </p>


          <p>
            <strong>Patient Name:</strong> {bill.patientName}
          </p>


          <p>
            <strong>Doctor Name:</strong> {bill.doctorName}
          </p>


          <p>
            <strong>Date:</strong> {bill.date}
          </p>


          <p>
            <strong>Total Amount:</strong> ₹ {bill.totalAmount}
          </p>


          <p>
            <strong>Status:</strong> {bill.paymentStatus}
          </p>



          <button
            className="btn btn-warning"
            onClick={() =>
              navigate(`/edit-billing/${bill.billId}`)
            }
          >
            Edit Bill
          </button>


        </div>


      </div>


    </div>

  );

}


export default ViewBilling;