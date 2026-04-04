import apiClient from "./apiClient";

export const getPatients = async () => {
  const response = await apiClient.get("/patients");
  return response.data;
};