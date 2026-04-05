import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useLoginAdmin } from '../hooks/useAdmin';
import { useLoginStaff } from '../hooks/useStaff';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false)  

  const { login: adminLogin, loading: adminLoading, error: adminError } = useLoginAdmin();
  const { login: staffLogin, loading: staffLoading, error: staffError } = useLoginStaff();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (admin === true) {
        const data = await adminLogin(email, password);
        console.log("Logged in:", data.admin);
        alert(`Login successful! Welcome back!`);
        navigate("/admin_dashboard");
      } else {
        const data = await staffLogin(email, password);
        console.log("Logged in:", data.staff);
        alert(`Login successful! Welcome back!`);
        navigate("/staff_dashboard");
      }
    } catch (err) {
      console.error(err);
      alert(`Oops! Something went wrong!`);
    }
  };

  if (staffLoading || adminLoading) {
      return (
        <div style={{
          height: "50vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#7f8c8d"
        }}>
          <h3>Loading dashboard...</h3>
        </div>
      );
  }

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        <div style={styles.header}>
          <div style={styles.logoCircle}>PA</div>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Patient Attendance Prediction and Management System</p>
        </div>
        
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input 
              type="email" 
              placeholder="name@clinic.com" 
              style={styles.input} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              style={styles.input} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" style={styles.button}>Login</button>
          {adminError || staffError && <p color="red.500">{adminError || staffError}</p>}
        </form>

        <div style={styles.divider}>
          <div style={styles.dividerLine}></div>
          <span style={styles.dividerText}>SELECT ACCOUNT TYPE</span>
          <div style={styles.dividerLine}></div>
        </div>

        <div style={styles.quickAccess}>
          <button 
            type="button" 
            style={{...styles.secondaryButton, borderColor: '#102a43', color: '#102a43'}}
            onClick={()=>setAdmin(true)}
          >
            Admin Login
          </button>
          <button 
            type="button" 
            style={{...styles.secondaryButton, borderColor: '#27ae60', color: '#27ae60'}}
            onClick={()=>setAdmin(false)}
          >
            Staff Login
          </button>
        </div>

        <div style={styles.footer}>
        <p>
          Admin Login Engaged: {admin ? "ON" : "OFF"}
        </p>
      </div>
      </div>
    </div>
  );
};

const styles = {
  container: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh', 
    width: '100vw', 
    background: 'linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)' 
  },
  loginCard: { 
    backgroundColor: 'white', 
    padding: '50px 40px', 
    borderRadius: '24px', 
    boxShadow: '0 10px 40px rgba(0,0,0,0.08)', 
    width: '100%', 
    maxWidth: '440px',
    textAlign: 'center'
  },
  header: { marginBottom: '40px' },
  logoCircle: {
    width: '60px',
    height: '60px',
    backgroundColor: '#2c6eb5',
    color: 'white',
    borderRadius: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto 20px',
    fontSize: '24px',
    fontWeight: 'bold',
    boxShadow: '0 8px 16px rgba(44, 110, 181, 0.2)'
  },
  title: { margin: '0 0 10px 0', color: '#102a43', fontSize: '28px', fontWeight: '800' },
  subtitle: { margin: 0, color: '#627d98', fontSize: '15px', fontWeight: '500' },
  form: { display: 'flex', flexDirection: 'column', gap: '25px', textAlign: 'left' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '14px', fontWeight: '700', color: '#334e68' },
  input: { 
    padding: '14px 16px', 
    borderRadius: '12px', 
    border: '2px solid #f0f4f8', 
    fontSize: '15px', 
    outline: 'none',
    backgroundColor: '#f8fafc',
    transition: 'all 0.2s ease'
  },
  options: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' },
  remember: { display: 'flex', alignItems: 'center', gap: '6px', color: '#627d98', cursor: 'pointer' },
  forgot: { color: '#2c6eb5', textDecoration: 'none', fontWeight: '600' },
  button: { 
    padding: '16px', 
    backgroundColor: '#2c6eb5', 
    color: 'white', 
    border: 'none', 
    borderRadius: '12px', 
    fontSize: '16px', 
    fontWeight: '700', 
    cursor: 'pointer',
    boxShadow: '0 6px 20px rgba(44, 110, 181, 0.25)',
    marginTop: '10px'
  },
  footer: { marginTop: '30px', borderTop: '1px solid #f0f4f8', paddingTop: '20px', fontSize: '14px', color: '#627d98' },
  link: { color: '#2c6eb5', textDecoration: 'none', fontWeight: '700' },
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '25px 0',
    color: '#94a3b8'
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: '#e2e8f0'
  },
  dividerText: {
    padding: '0 10px',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.5px'
  },
  quickAccess: {
    display: 'flex',
    gap: '12px'
  },
  secondaryButton: {
    flex: 1,
    padding: '12px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    backgroundColor: 'white',
    border: '2px solid',
    transition: 'all 0.2s ease'
  }
};