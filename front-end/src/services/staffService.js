import apiClient from "./apiClient";

export const loginStaff = async (credentials) => {
  const response = await apiClient.post("/staff_login", credentials);
  return response.data;
};

export const logoutStaff = async () => {
  const response = await apiClient.delete("/logout");
  return response.data;
};

export const currentStaff = async () => {
  const response = await apiClient.get("/current_staff");
  return response.data;
};

export const getAppointments = async () => {
  const response = await apiClient.get("/appointments");
  return response.data;
};

// export const signupStaffs = async (staffData) => {
//   const response = await apiClient.post("/staffs", staffData);
//   return response.data;
// };

// export const deleteStaff = async (staffId) => {
//   await apiClient.delete(`/staffs/${staffId}`);
// };