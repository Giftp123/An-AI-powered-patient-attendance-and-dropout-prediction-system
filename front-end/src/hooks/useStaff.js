import { useState, useEffect } from "react";
import { loginStaff, logoutStaff, currentStaff, getAppointments } from "../services/staffService";

export function useLoginStaff() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [staff, setStaff] = useState(null);

    const login = async (email, password) => {
    try {
        setLoading(true);
        setError(null);
        const data = await loginStaff({ email, password });
        setStaff(data.staff);
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
    return { login, loading, error, staff };
};

export function useLogoutStaff() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const logout = async () => {
    try {
        setLoading(true);
        setError(null);
        await logoutStaff();
    } catch (err) {
        setError("Logout failed");
        throw err;
    } finally {
        setLoading(false);
    }
    };

    return { logout, loading, error };
};

export function useCurrentStaff () {
    const [staff, setStaff] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    const fetchStaff = async () => {
        try {
        const data = await currentStaff();
        setStaff(data);
        } catch (err) {
        setError("Not authenticated");
        } finally {
        setLoading(false);
        }
    };
    fetchStaff();
    }, []);

    return { staff, loading, error };
};

export const fetchAllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await getAppointments();
      setAppointments(data);
    } catch (err) {
      setError("Failed to fetch appointments");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  // Fetch on mount
  useEffect(() => {
    fetchAppointments();
  }, []);

  return { appointments, loading, error, refetch: fetchAppointments };
};

// export const useSignupStaffs = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const signup = async (staffData) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await signupStaffs(staffData);
//       return data;
//     } catch (err) {
//       setError(err.response?.data?.error || "Signup failed");
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { signup, loading, error };
// };

// export function useDeleteStaff() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const remove = async (id) => {
//     try {
//       setLoading(true);
//       setError(null);
//       await deleteStaff(id);
//     } catch (err) {
//       setError(err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { deleteStaff: remove, loading, error };
// }