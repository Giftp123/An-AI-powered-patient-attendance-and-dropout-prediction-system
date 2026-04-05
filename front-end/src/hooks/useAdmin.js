import { useState, useEffect } from "react";
import { loginAdmin, logoutAdmin, currentAdmin, getStaffs, signupStaffs, deleteStaff } from "../services/adminService";

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

export function useCurrentAdmin () {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const data = await currentAdmin();
        setAdmin(data);
      } catch (err) {
        setError("Not authenticated");
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  return { admin, loading, error };
};

export const useAllStaffs = () => {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStaffs = async () => {
    try {
      setLoading(true);
      const data = await getStaffs();
      setStaffs(data);
    } catch (err) {
      setError("Failed to fetch staffs");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  // Fetch on mount
  useEffect(() => {
    fetchStaffs();
  }, []);

  return { staffs, loading, error, refetch: fetchStaffs };
};

export const useSignupStaffs = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = async (staffData) => {
    try {
      setLoading(true);
      setError(null);
      const data = await signupStaffs(staffData);
      return data;
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error };
};

export function useDeleteStaff() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const remove = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await deleteStaff(id);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteStaff: remove, loading, error };
}