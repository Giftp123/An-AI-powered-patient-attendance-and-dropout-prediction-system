import { useState, useEffect } from "react";
import { getPatients } from "../services/patientService";

export const useFetchPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const data = await getPatients();
      setPatients(data);
    } catch (err) {
      setError("Failed to fetch patients");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  // Fetch on mount
  useEffect(() => {
    fetchPatients();
  }, []);

  return { patients, loading, error, refetch: fetchPatients };
};