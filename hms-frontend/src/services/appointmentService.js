import axios from "axios";

const API_URL = "http://localhost:8082/api/appointments";

export const getAllAppointments = () => axios.get(API_URL);

export const getAppointmentById = (id) => axios.get(`${API_URL}/${id}`);

export const addAppointment = (appointment) => axios.post(API_URL, appointment);

export const updateAppointment = (id, appointment) =>
  axios.put(`${API_URL}/${id}`, appointment);

export const deleteAppointment = (id) =>
  axios.delete(`${API_URL}/${id}`);