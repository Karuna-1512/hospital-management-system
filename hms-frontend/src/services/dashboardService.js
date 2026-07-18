import api from "./api";

export const getDashboard = () => {
    return api.get("/dashboard");
};

export const getAppointments = () => {
    return api.get("/appointments");
};