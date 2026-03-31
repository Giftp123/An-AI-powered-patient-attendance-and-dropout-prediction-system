import { useState } from "react";
import { loginAdmin } from "../services/adminService";
import { logoutAdmin } from "../services/adminService";

export function useLoginAdmin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [admin, setAdmin] = useState(null);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const data = await loginAdmin({ email, password });
      setAdmin(data.admin);
      return data;

    } catch (err) {
      if (err.response?.status === 401) {
        setError("Invalid email or password");
      } else if (err.response?.status === 404) {
        setError("Account not found");
      } else {
        setError("Login failed. Try again.");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, admin };
};

export function useLogoutAdmin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      await logoutAdmin();
    } catch (err) {
      setError("Logout failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading, error };
};