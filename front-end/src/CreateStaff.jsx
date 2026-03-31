import React, { useState } from 'react';

const CreateStaff = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Clinic Staff',
    phone: '',
    photo: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Staff Data:', formData);
    alert(`Account created successfully for ${formData.name}!`);
    onBack();
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>← Back to Admin Panel</button>
        <h2 style={{ margin: 0 }}>Register New Staff Member</h2>
      </header>

      <div style={styles.formCard}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name</label>
              <input 
                type="text" 
                required 
                style={styles.input} 
                placeholder="e.g. Dr. Jane Doe"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input 
                type="email" 
                required 
                style={styles.input} 
                placeholder="jane.doe@clinic.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input 
                type="password" 
                required 
                style={styles.input} 
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Phone Number</label>
              <input 
                type="tel" 
                required 
                style={styles.input} 
                placeholder="+254 7XX XXX XXX"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Assigned Role</label>
              <select 
                style={styles.input}
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              >
                <option value="Clinic Staff">Clinic Staff</option>
                <option value="Nurse Practitioner">Nurse Practitioner</option>
                <option value="Senior Clinician">Senior Clinician</option>
                <option value="Specialist">Specialist</option>
                <option value="System Administrator">System Administrator</option>
              </select>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Profile Photo</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                style={styles.fileInput}
              />
            </div>
          </div>

          <div style={styles.footer}>
            <button type="button" onClick={onBack} style={styles.cancelBtn}>Cancel</button>
            <button type="submit" style={styles.submitBtn}>Create Staff Account</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '30px', backgroundColor: '#f0f2f5', minHeight: '100vh', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
  header: { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' },
  backBtn: { background: 'none', border: 'none', color: '#2c3e50', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' },
  formCard: { backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', maxWidth: '800px', margin: '0 auto' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  row: { display: 'flex', gap: '20px' },
  inputGroup: { flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '14px', fontWeight: 'bold', color: '#34495e' },
  input: { padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px', outline: 'none' },
  fileInput: { padding: '8px 0', fontSize: '14px' },
  footer: { display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '20px' },
  cancelBtn: { padding: '12px 25px', borderRadius: '8px', border: '1px solid #ddd', backgroundColor: 'white', cursor: 'pointer', fontWeight: 'bold', color: '#7f8c8d' },
  submitBtn: { padding: '12px 30px', borderRadius: '8px', border: 'none', backgroundColor: '#2c3e50', color: 'white', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }
};

export default CreateStaff;