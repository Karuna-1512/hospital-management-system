import api from "./api";
import axios from "axios";

export const getAllDoctors = async () => {
	try {
		return await api.get("/doctors");
	} catch (err) {
		// fallback to local mock served from public/mock/doctors.json
		const res = await axios.get("/mock/doctors.json");
		return { data: res.data };
	}
};

export const getDoctorById = (id) => api.get(`/doctors/${id}`);

export const addDoctor = (doctor) => api.post("/doctors", doctor);

export const updateDoctor = (id, doctor) => api.put(`/doctors/${id}`, doctor);

export const deleteDoctor = (id) => api.delete(`/doctors/${id}`);