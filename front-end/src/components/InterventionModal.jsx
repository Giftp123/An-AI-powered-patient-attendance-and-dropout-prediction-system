import React from 'react';

const InterventionModal = ({ patient, onClose }) => {
  if (!patient) return null;

  const handleSend = (channel) => {
    alert(`Intervention triggered for ${patient.name} via ${channel}. Reminder sent!`);
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <h3>Send Intervention</h3>
          <button onClick={onClose} style={styles.closeBtn}>×</button>
        </div>
        
        <div style={styles.modalBody}>
          <p><strong>Patient:</strong> {patient.name}</p>
          <p><strong>Risk Level:</strong> <span style={{color: '#e74c3c'}}>{patient.risk} ({patient.score})</span></p>
          
          <div style={styles.messageBox}>
            <p style={styles.label}>Reminder Message Preview:</p>
            <div style={styles.preview}>
              "Reminder: You have an appointment on {patient.time}. Please contact us if you need to reschedule."
            </div>
          </div>

          <div style={styles.buttonGroup}>
            <button onClick={() => handleSend('SMS')} style={styles.smsBtn}>Send via SMS</button>
            <button onClick={() => handleSend('WhatsApp')} style={styles.waBtn}>Send via WhatsApp</button>
            <button onClick={() => handleSend('Email')} style={styles.emailBtn}>Send via Email</button>
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