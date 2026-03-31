import React, { useState } from 'react';
import InterventionModal from './InterventionModal';
import Analytics from './Analytics';
import AppointmentModal from './AppointmentModal';

const Dashboard = ({ user, onLogout, onNavigateToSearch, onViewPatient }) => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showApptModal, setShowApptModal] = useState(false);
  const [apptPatient, setApptPatient] = useState(null);

  const [appointments, setAppointments] = useState([
    { 
      id: "APT001", 
      patientId: "PAT001",
      patient: "Alice Kamau", 
      time: "10:00 AM", 
      risk: "High", 
      score: "82%", 
      age: 34,
      gender: "Female",
      phone: "+254 712 345 678",
      email: "alice.k@email.com",
      history: "2 previous no-shows, last visit 45 days ago" 
    },
    { 
      id: "APT002", 
      patientId: "PAT002",
      patient: "John Mutua", 
      time: "11:30 AM", 
      risk: "Low", 
      score: "12%", 
      age: 45,
      gender: "Male",
      phone: "+254 722 987 654",
      email: "john.m@email.com",
      history: "5 previous visits, 0 no-shows" 
    },
    { 
      id: "APT003", 
      patientId: "PAT003",
      patient: "Sarah Chen", 
      time: "01:00 PM", 
      risk: "Medium", 
      score: "45%", 
      age: 29,
      gender: "Female",
      phone: "+254 733 111 222",
      email: "sarah.c@email.com",
      history: "1 missed appointment in 2025" 
    },
  ]);

  const handleOpenApptModal = (patient = null) => {
    setApptPatient(patient);
    setShowApptModal(true);
  };

  const handleAddAppointment = (formData) => {
    const newAppt = {
      id: `APT${Math.floor(Math.random() * 1000)}`,
      patientId: formData.patientId,
      patient: formData.patientName,
      time: formData.time || "TBD",
      date: formData.date,
      risk: "Pending",
      score: "--",
      history: formData.reason
    };
    setAppointments([newAppt, ...appointments]);
  };

  return (
    <div style={styles.dashboardContainer}>
      <header style={styles.header}>
        <div>
          <h2 style={{ margin: 0 }}>Patient Attendance Prediction System</h2>
          <span style={{ fontSize: '12px', color: '#7f8c8d' }}>
            User: {user.email} | Role: {user.role}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => handleOpenApptModal()} style={styles.scheduleBtn}>+ Schedule Appt</button>
          <button onClick={onNavigateToSearch} style={styles.searchBtn}>Search Patients</button>
          <button onClick={onLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      </header>

      <div style={styles.statsRow}>
        <div style={{ ...styles.card, borderTop: '4px solid #27ae60' }}>
          <p style={styles.statLabel}>Low Risk</p>
          <h3>24</h3>
        </div>
        <div style={{ ...styles.card, borderTop: '4px solid #f39c12' }}>
          <p style={styles.statLabel}>Medium Risk</p>
          <h3>12</h3>
        </div>
        <div style={{ ...styles.card, borderTop: '4px solid #e74c3c' }}>
          <p style={styles.statLabel}>High Risk</p>
          <h3>5</h3>
        </div>
      </div>

      <section style={styles.tableSection}>
        <h3 style={{ marginBottom: '15px' }}>Upcoming Schedule</h3>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>Patient ID</th>
              <th style={styles.th}>Patient Name</th>
              <th style={styles.th}>Time</th>
              <th style={styles.th}>Risk Level</th>
              <th style={styles.th}>Score</th>
              <th style={styles.th}>Engagement History</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((apt) => (
              <tr key={apt.id} style={styles.tableRow}>
                <td style={styles.td}><strong>{apt.patientId || 'N/A'}</strong></td>
                <td style={styles.td}>
                  <button 
                    style={{ ...styles.linkBtn, fontWeight: '600' }}
                    onClick={() => onViewPatient({ 
                      id: apt.patientId,
                      name: apt.patient, 
                      risk: apt.risk, 
                      score: apt.score,
                      age: apt.age,
                      gender: apt.gender,
                      phone: apt.phone,
                      email: apt.email
                    })}
                  >
                    {apt.patient}
                  </button>
                </td>
                <td style={styles.td}>{apt.time}</td>
                <td style={styles.td}>
                  <span style={{
                    ...styles.badge,
                    backgroundColor: apt.risk === 'High' ? '#e74c3c' : apt.risk === 'Medium' ? '#f39c12' : '#27ae60'
                  }}>
                    {apt.risk}
                  </span>
                </td>
                <td style={styles.td}><strong>{apt.score}</strong></td>
                <td style={{ ...styles.td, fontSize: '12px', color: '#7f8c8d' }}>{apt.history}</td>
                <td style={styles.td}>
                  <button 
                    style={styles.actionBtn} 
                    onClick={() => setSelectedPatient(apt)}
                  >
                    Remind
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <Analytics />

      {selectedPatient && (
        <InterventionModal 
          patient={selectedPatient} 
          onClose={() => setSelectedPatient(null)} 
        />
      )}

      {showApptModal && (
        <AppointmentModal 
          patientId={apptPatient?.id}
          patientName={apptPatient?.patient}
          onClose={() => setShowApptModal(false)}
          onSubmit={handleAddAppointment}
        />
      )}
    </div>
  );
};

const styles = {
  dashboardContainer: { padding: '30px', backgroundColor: '#f0f4f8', minHeight: '100vh', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
  header: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: '30px', 
    backgroundColor: 'white', 
    padding: '20px 30px', 
    borderRadius: '16px', 
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
    border: '1px solid #e1e8ed'
  },
  scheduleBtn: { padding: '10px 20px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', boxShadow: '0 4px 10px rgba(39, 174, 96, 0.2)' },
  searchBtn: { padding: '10px 20px', backgroundColor: '#2c6eb5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', boxShadow: '0 4px 10px rgba(44, 110, 181, 0.2)' },
  logoutBtn: { padding: '10px 20px', backgroundColor: 'transparent', color: '#e74c3c', border: '2px solid #e74c3c', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
  statsRow: { display: 'flex', gap: '25px', marginBottom: '35px' },
  card: { 
    flex: 1, 
    backgroundColor: 'white', 
    padding: '25px', 
    borderRadius: '16px', 
    boxShadow: '0 4px 12px rgba(0,0,0,0.03)', 
    textAlign: 'center',
    transition: 'transform 0.2s ease',
    cursor: 'default',
    border: '1px solid #f0f0f0'
  },
  statLabel: { margin: '0 0 8px 0', color: '#7f8c8d', fontSize: '13px', fontWeight: 'bold', letterSpacing: '0.5px' },
  tableSection: { 
    backgroundColor: 'white', 
    padding: '30px', 
    borderRadius: '16px', 
    boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
    border: '1px solid #e1e8ed'
  },
  table: { width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px' },
  tableHeader: { textAlign: 'left', backgroundColor: '#f8fafc' },
  th: { padding: '15px', color: '#4b5563', fontSize: '14px', fontWeight: '600' },
  td: { padding: '18px 15px', color: '#1f2937', fontSize: '14px', backgroundColor: '#fff', borderBottom: '1px solid #f3f4f6' },
  tableRow: { transition: 'background-color 0.2s' },
  badge: { color: 'white', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  actionBtn: { padding: '8px 18px', backgroundColor: '#2c6eb5', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' },
  linkBtn: { background: 'none', border: 'none', color: '#2c6eb5', cursor: 'pointer', padding: 0, fontSize: '15px', textAlign: 'left', textDecoration: 'none', borderBottom: '1px solid transparent' }
};

export default Dashboard;