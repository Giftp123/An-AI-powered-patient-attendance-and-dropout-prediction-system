import apiClient from "./apiClient";

export const loginAdmin = async (credentials) => {
  const response = await apiClient.post("/admin_login", credentials);
  return response.data;
};

export const logoutAdmin = async () => {
  const response = await apiClient.delete("/logout");
  return response.data;
};