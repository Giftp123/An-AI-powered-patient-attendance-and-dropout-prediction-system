import React from 'react';
import apiClient from '../services/apiClient';

const InterventionModal = ({ appt, onClose }) => {
  const apptId = appt._id
  console.log(apptId);

  const handleSend = async (id, channel) => {
    try {
      await apiClient.post(`/appointments/${id}/send_reminder`);
      alert(`Intervention triggered for ${appt.patient.name} via ${channel}. Reminder sent!`);
      onClose();
    } catch (err) {
        console.error(err);
  }};

  if (!appt) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <h3>Send Intervention</h3>
          <button onClick={onClose} style={styles.closeBtn}>×</button>
        </div>
        
        <div style={styles.modalBody}>
          <p><strong>Patient:</strong> {appt.patient.name}</p>
          <p><strong>Risk Level:</strong> <span style={{color: '#e74c3c'}}>{appt.patient.risk_level}</span></p>
          
          <div style={styles.messageBox}>
            <p style={styles.label}>Reminder Message Preview:</p>
            <div style={styles.preview}>
              "This is a reminder that you have an appointment scheduled on the following day. Kindly make sure you attend on
              time and kindly contact us if you need to reschedule. Thank you!"
            </div>
          </div>

          <div style={styles.buttonGroup}>
            <button onClick={() => handleSend(apptId, 'Email')} style={styles.emailBtn}>Send via Email</button>
          </div>
        </div>
      </div>
    </div>
  );

};

const styles = {
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modal: { backgroundColor: 'white', padding: '20px', borderRadius: '12px', width: '450px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', marginBottom: '15px' },
  closeBtn: { background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' },
  modalBody: { textAlign: 'left' },
  label: { fontSize: '12px', color: '#7f8c8d', marginBottom: '5px' },
  preview: { padding: '10px', backgroundColor: '#f9f9f9', border: '1px solid #ddd', borderRadius: '5px', fontStyle: 'italic', fontSize: '14px', marginBottom: '20px' },
  buttonGroup: { display: 'flex', flexDirection: 'column', gap: '10px' },
  smsBtn: { padding: '10px', backgroundColor: '#2c3e50', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  waBtn: { padding: '10px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  emailBtn: { padding: '10px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }
};

export default InterventionModal;