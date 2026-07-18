import api from "./api";

export const getAllBills = () => api.get("/billing");

export const addBill = (bill) => api.post("/billing", bill);

export const deleteBill = (id) => api.delete(`/billing/${id}`);

export const getBillById = (id) => api.get(`/billing/${id}`);

export const updateBill = (id, bill) =>
  api.put(`/billing/${id}`, bill);