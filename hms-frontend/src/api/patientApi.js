import axios from "axios";

const BASE_URL = "http://localhost:8082/api/patients";

export const getPatients = () => axios.get(BASE_URL);

export const getPatientById = (id) =>
  axios.get(`${BASE_URL}/${id}`);

export const addPatient = (patient) =>
  axios.post(BASE_URL, patient);

export const updatePatient = (id, patient) =>
  axios.put(`${BASE_URL}/${id}`, patient);

export const deletePatient = (id) =>
  axios.delete(`${BASE_URL}/${id}`);