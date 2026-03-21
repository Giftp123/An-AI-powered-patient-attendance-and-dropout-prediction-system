import React, { useState } from 'react';

const AppointmentModal = ({ patientId, patientName, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    patientId: patientId || '',
    patientName: patientName || '',
    reason: '',
    date: '',
    time: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.reason || !formData.patientName) {
      alert("Please fill in all required fields.");
      return;
    }
    onSubmit(formData);
    alert(`Appointment scheduled for ${formData.patientName} on ${formData.date}`);
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <h3 style={{ margin: 0 }}>Schedule New Appointment</h3>
          <button onClick={onClose} style={styles.closeBtn}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Patient ID</label>
            <input 
              type="text" 
              value={formData.patientId} 
              readOnly={!!patientId}
              onChange={(e) => setFormData({...formData, patientId: e.target.value})}
              style={{ ...styles.input, backgroundColor: patientId ? '#f0f0f0' : 'white' }}
              placeholder="Enter Patient ID"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Patient Name</label>
            <input 
              type="text" 
              required
              value={formData.patientName} 
              readOnly={!!patientName}
              onChange={(e) => setFormData({...formData, patientName: e.target.value})}
              style={{ ...styles.input, backgroundColor: patientName ? '#f0f0f0' : 'white' }}
              placeholder="Enter Patient Full Name"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Appointment Date</label>
            <input 
              type="date" 
              required
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Time</label>
            <input 
              type="time" 
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Reason for Appointment</label>
            <textarea 
              required
              rows="3"
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
              style={styles.textarea}
              placeholder="e.g. Routine checkup, Follow-up on medication..."
            />
          </div>

          <div style={styles.footer}>
            <button type="button" onClick={onClose} style={styles.cancelBtn}>Cancel</button>
            <button type="submit" style={styles.submitBtn}>Schedule Appointment</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 },
  modal: { backgroundColor: 'white', padding: '25px', borderRadius: '12px', width: '400px', boxShadow: '0 15px 35px rgba(0,0,0,0.2)' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' },
  closeBtn: { background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#7f8c8d' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '5px' },
  label: { fontSize: '13px', fontWeight: 'bold', color: '#2c3e50' },
  input: { padding: '10px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px', outline: 'none' },
  textarea: { padding: '10px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px', outline: 'none', resize: 'none' },
  footer: { display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' },
  cancelBtn: { padding: '10px 15px', borderRadius: '6px', border: '1px solid #ddd', backgroundColor: 'white', cursor: 'pointer', fontWeight: 'bold' },
  submitBtn: { padding: '10px 20px', borderRadius: '6px', border: 'none', backgroundColor: '#2c6eb5', color: 'white', cursor: 'pointer', fontWeight: 'bold' }
};

export default AppointmentModal;