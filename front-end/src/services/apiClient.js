import axios from "axios";
const apiUrl = "http://localhost:3000/"

const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

export default apiClient;