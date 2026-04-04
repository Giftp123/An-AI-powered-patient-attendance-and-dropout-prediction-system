import apiClient from "./apiClient";

export const getPatients = async () => {
  const response = await apiClient.get("/patients");
  return response.data;
};

export const getPatientById = async (id) => {
  const res = await apiClient.get(`/patients/${id}/`);
  return res.data;
};

export const getPatientAppointments = async (id) => {
  const res = await apiClient.get(`/patients/${id}/appointments`);
  return res.data;
};