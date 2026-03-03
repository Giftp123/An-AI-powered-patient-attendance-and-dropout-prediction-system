import React, { useState } from 'react';
import InterventionModal from './InterventionModal';
import Analytics from './Analytics';

const Dashboard = ({ user, onLogout }) => {
  const [selectedPatient, setSelectedPatient] = useState(null);

  const appointments = [
    { 
      id: "APT001", 
      patient: "Alice Kamau", 
      time: "10:00 AM", 
      risk: "High", 
      score: "82%", 
      history: "2 previous no-shows, last visit 45 days ago" 
    },
    { 
      id: "APT002", 
      patient: "John Mutua", 
      time: "11:30 AM", 
      risk: "Low", 
      score: "12%", 
      history: "5 previous visits, 0 no-shows" 
    },
    { 
      id: "APT003", 
      patient: "Sarah Chen", 
      time: "01:00 PM", 
      risk: "Medium", 
      score: "45%", 
      history: "1 missed appointment in 2025" 
    },
  ];

  return (
    <div style={styles.dashboardContainer}>
      <header style={styles.header}>
        <div>
          <h2 style={{ margin: 0 }}>Patient Attendance Prediction System</h2>
          <span style={{ fontSize: '12px', color: '#7f8c8d' }}>
            User: {user.email} | Role: {user.role}
          </span>
        </div>
        <button onClick={onLogout} style={styles.logoutBtn}>Logout</button>
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
              <th style={styles.th}>Patient</th>
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
                <td style={styles.td}>{apt.patient}</td>
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
    </div>
  );
};

const styles = {
  dashboardContainer: { padding: '30px', backgroundColor: '#f4f7f6', minHeight: '100vh', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', backgroundColor: 'white', padding: '15px 25px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' },
  logoutBtn: { padding: '8px 16px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' },
  statsRow: { display: 'flex', gap: '20px', marginBottom: '30px' },
  card: { flex: 1, backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'center' },
  statLabel: { margin: '0 0 5px 0', color: '#7f8c8d', fontSize: '14px', fontWeight: 'bold' },
  tableSection: { backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeader: { textAlign: 'left', borderBottom: '2px solid #f4f7f6' },
  th: { padding: '12px 8px', color: '#2c3e50' },
  td: { padding: '12px 8px', color: '#34495e' },
  tableRow: { borderBottom: '1px solid #f4f7f6' },
  badge: { color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' },
  actionBtn: { padding: '6px 14px', backgroundColor: '#2c6eb5', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default Dashboard;