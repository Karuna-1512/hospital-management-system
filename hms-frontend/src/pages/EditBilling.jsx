import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBillById, updateBill } from "../services/billingService";

function EditBilling() {


  const navigate = useNavigate();

  const { id } = useParams();


  const [bill,setBill] = useState({

    patientName:"",
    doctorName:"",
    date:"",
    amount:"",
    status:""

  });



  useEffect(() => {
    loadBill();
  }, []);

  const loadBill = async () => {
    try {
      const response = await getBillById(id);

      setBill({
        patientName: response.data.patientName,
        doctorName: response.data.doctorName,
        date: response.data.date,
        amount: response.data.totalAmount,
        status: response.data.paymentStatus,
      });

    } catch (error) {
      console.error(error);
    }
  };




  const handleChange=(e)=>{

    setBill({

      ...bill,

      [e.target.name]:e.target.value

    });

  };




  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedBill = {
      patientName: bill.patientName,
      doctorName: bill.doctorName,
      date: bill.date,
      consultationFee: Number(bill.amount),
      medicineCharges: 0,
      labCharges: 0,
      roomCharges: 0,
      totalAmount: Number(bill.amount),
      paymentStatus: bill.status,
    };

    try {
      await updateBill(id, updatedBill);
      alert("Bill Updated Successfully");
      navigate("/billing");
    } catch (error) {
      console.error(error);
      alert("Failed to update bill");
    }
  };




  return (

    <div className="container mt-4">


      <h2>
        Edit Billing
      </h2>



      <form onSubmit={handleSubmit}>


        <input
          className="form-control mb-3"
          name="patientName"
          value={bill.patientName}
          onChange={handleChange}
          placeholder="Patient Name"
        />



        <input
          className="form-control mb-3"
          name="doctorName"
          value={bill.doctorName}
          onChange={handleChange}
          placeholder="Doctor Name"
        />



        <input
          className="form-control mb-3"
          name="date"
          value={bill.date}
          onChange={handleChange}
          placeholder="Date"
        />



        <input
          className="form-control mb-3"
          name="amount"
          value={bill.amount}
          onChange={handleChange}
          placeholder="Amount"
        />



        <select
          className="form-select mb-3"
          name="status"
          value={bill.status}
          onChange={handleChange}
        >

          <option>
            Paid
          </option>

          <option>
            Pending
          </option>


        </select>



        <button className="btn btn-success">
          Update Bill
        </button>


      </form>


    </div>

  );

}


export default EditBilling;