import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBills, deleteBill } from "../services/billingService";


function Billing() {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");


  const [bills, setBills] = useState([]);

 useEffect(() => {
  loadBills();
}, []);

const loadBills = async () => {
  try {
    const response = await getAllBills();
    setBills(response.data);
  } catch (error) {
    console.error(error);
  }
};

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this bill?"
    );


    if (!confirmDelete) return;

    try {
      await deleteBill(id);
      loadBills();
    } catch (error) {
      console.error(error);
    }

  };



  const filteredBills = bills.filter((bill)=>

    bill.patientName
      ?.toLowerCase()
      .includes(search.toLowerCase())

  );



  return (

    <div>

      <div className="page-header">
        <div>
          <h2>Billing</h2>
          <p>Manage patient billing and payment records</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/add-billing")}
        >
          + Create Bill
        </button>
      </div>

      <div className="table-card">

        <div className="table-header">
          <input
            type="text"
            className="search-box"
            placeholder="Search Patient Name..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />
        </div>

        <table className="table table-bordered table-hover">


        <thead className="table-primary">

          <tr>

            <th>ID</th>

            <th>Patient Name</th>

            <th>Doctor</th>

            <th>Date</th>

            <th>Total Amount</th>

            <th>Status</th>

            <th>Actions</th>


          </tr>

        </thead>



        <tbody>


        {
          filteredBills.length > 0 ?


          filteredBills.map((bill)=>(


            <tr key={bill.billId}>


              <td>{bill.billId}</td>


              <td>{bill.patientName}</td>


              <td>{bill.doctorName}</td>


              <td>{bill.date}</td>


              <td>
                ₹ {bill.totalAmount}
              </td>


              <td>

                <span className="badge bg-success">
                  {bill.paymentStatus}
                </span>

              </td>



              <td>


                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={()=>
                    navigate(`/view-billing/${bill.billId}`)
                  }
                >
                  View
                </button>



                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={()=>
                    navigate(`/edit-billing/${bill.billId}`)
                  }
                >
                  Edit
                </button>



                <button
                  className="btn btn-danger btn-sm"
                  onClick={()=>
                    handleDelete(bill.billId)
                  }
                >
                  Delete
                </button>


              </td>


            </tr>


          ))


          :


          <tr>

            <td
              colSpan="7"
              className="text-center"
            >
              No Billing Records Found
            </td>

          </tr>


        }


        </tbody>


      </table>

      </div>

    </div>

  );

}


export default Billing;