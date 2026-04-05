import { useState, useEffect } from "react";
import { getPatients, getPatientById, getPatientAppointments } from "../services/patientService";

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

export const useGetPatientById = (id) => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchPatient = async () => {
      try {
        setLoading(true);
        const data = await getPatientById(id);
        setPatient(data);
      } catch (err) {
        setError("Failed to load patient");
      } finally {
        setLoading(false);
      }
    };
    fetchPatient();
  }, [id]);

  return { patient, loading, error };
};

export const useGetPatientAppointments = (id) => {
  const [patientAppts, setPatientAppts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchPatientAppointments = async () => {
      try {
        setLoading(true);
        const data = await getPatientAppointments(id);
        setPatientAppts(data);
      } catch (err) {
        setError("Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };
    fetchPatientAppointments();
  }, [id]);

  return { patientAppts, loading, error };
};