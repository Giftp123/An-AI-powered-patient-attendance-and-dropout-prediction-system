// src/services/api.js example
export const fetchAppointments = async () => {
  // Currently returning mock data [cite: 18]
  return [
    { id: 1, name: "John Doe", riskScore: 0.85, classification: "High" },
    { id: 2, name: "Jane Smith", riskScore: 0.10, classification: "Low" }
  ];
};