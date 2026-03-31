import React, { useState } from "react";
import axios from "axios";

const Login = ({ onLogin }) => {
  // const [email, setEmail] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onLogin(email);
  // };

  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post("http://127.0.0.1:3000/login", {
      email: credentials.email,
      password: credentials.password
    });

    alert("Login successful!");
    onLogin(response.data.user);

  } catch (error) {
    if (error.response && error.response.status === 401) {
      alert("Invalid email or password.");
    } else {
      alert("Server error. Try again.");
    }
  }
};

  return (
    <div style={styles.container}>
      <div style={styles.brandingBox}>
        <div style={styles.logoIcon}>✚</div>
        <h2 style={styles.systemTitle}>AI-Powered Patient Attendance & Dropout Prediction</h2>
      </div>
      <div style={styles.loginCard}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Email Address</label>
          <input 
            name = "email"
            type = "email" 
            placeholder ="jsmith@hospital.com" 
            value = {credentials.email}
            required 
            style={styles.input}
            onChange={handleChange}
          />
          <label style={styles.label}>Password</label>
          <input 
            name = "password"
            type = "password"
            placeholder ="••••••••"
            required
            style={styles.input}
            onChange={handleChange}
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <div style={styles.footerInfo}>
          <p>Role: Clinic Staff or Admin</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f4f8', fontFamily: 'sans-serif' },
  brandingBox: { backgroundColor: '#2c6eb5', width: '400px', padding: '20px', borderRadius: '12px 12px 0 0', textAlign: 'center', color: 'white' },
  systemTitle: { fontSize: '16px', margin: 0 },
  loginCard: { width: '400px', backgroundColor: 'white', padding: '30px', borderRadius: '0 0 12px 12px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' },
  form: { display: 'flex', flexDirection: 'column' },
  label: { fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '5px' },
  input: { padding: '10px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #ddd' },
  button: { padding: '12px', backgroundColor: '#2c6eb5', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  footerInfo: { marginTop: '20px', fontSize: '12px', color: '#7f8c8d', textAlign: 'center' }
};

export default Login;