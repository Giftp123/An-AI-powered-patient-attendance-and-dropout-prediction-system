import React, { useState } from 'react';
import AppointmentModal from './AppointmentModal';

const AddPatient = ({ patient, onBack }) => {
  const [showApptModal, setShowApptModal] = useState(false);

  const defaultData = {
    id: "PAT001",
    name: "Unknown Patient",
    age: "N/A",
    gender: "Not Specified",
    phone: "No Contact Info",
    email: "no-email@clinic.com",
    risk: "Low",
    score: "0%"
  };

  // Merge passed patient data with defaults
  const data = { ...defaultData, ...patient };

  const pastAppointments = [
    { date: "2024-02-15", type: "Checkup", status: "Attended", doctor: "Dr. Nelson" },
    { date: "2024-01-10", type: "Follow-up", status: "No-show", doctor: "Dr. Nelson" },
    { date: "2023-11-20", type: "Initial Consultation", status: "Attended", doctor: "Dr. Sarah" },
  ];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button onClick={onBack} style={styles.backBtn}>← Back</button>
          <h2 style={{ margin: 0 }}>Patient Profile: {data.name}</h2>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={styles.scheduleBtn} onClick={() => setShowApptModal(true)}>
            Schedule Appointment
          </button>
          <button style={styles.addNewBtn} onClick={() => alert('Opening Add New Patient Form...')}>
            + Add New Patient
          </button>
        </div>
      </header>

      <div style={styles.mainGrid}>
        {/* Patient Details Section */}
        <section style={styles.card}>
          <h3 style={styles.cardTitle}>Personal Details</h3>
          <div style={styles.detailsGrid}>
            <div><label style={styles.label}>Patient ID:</label><p>{data.id}</p></div>
            <div><label style={styles.label}>Age / Gender:</label><p>{data.age} / {data.gender}</p></div>
            <div><label style={styles.label}>Phone:</label><p>{data.phone}</p></div>
            <div><label style={styles.label}>Email:</label><p>{data.email}</p></div>
            <div>
              <label style={styles.label}>Risk Status:</label>
              <p style={{ color: data.risk === 'High' ? '#e74c3c' : '#27ae60', fontWeight: 'bold' }}>
                {data.risk} ({data.score})
              </p>
            </div>
          </div>
        </section>

        {/* Upcoming Appointment Section */}
        <section style={styles.card}>
          <h3 style={styles.cardTitle}>Upcoming Appointment</h3>
          <div style={styles.upcomingBox}>
            <p><strong>Date:</strong> March 25, 2026</p>
            <p><strong>Time:</strong> 10:30 AM</p>
            <p><strong>Purpose:</strong> Routine Follow-up</p>
            <div style={styles.btnGroup}>
              <button style={styles.completeBtn} onClick={() => alert('Marked as Complete')}>Mark Complete</button>
              <button style={styles.notifyBtn} onClick={() => alert('Notification sent to patient!')}>Notify Patient</button>
            </div>
          </div>
        </section>

        {/* Past Appointments Section */}
        <section style={{ ...styles.card, gridColumn: 'span 2' }}>
          <h3 style={styles.cardTitle}>Past Appointments</h3>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Doctor</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {pastAppointments.map((apt, i) => (
                <tr key={i} style={styles.tableRow}>
                  <td style={styles.td}>{apt.date}</td>
                  <td style={styles.td}>{apt.type}</td>
                  <td style={styles.td}>{apt.doctor}</td>
                  <td style={styles.td}>
                    <span style={{ 
                      color: apt.status === 'Attended' ? '#27ae60' : '#e74c3c',
                      fontWeight: '600',
                      fontSize: '13px'
                    }}>
                      {apt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Attendance Charts Section */}
        <section style={{ ...styles.card, gridColumn: 'span 2' }}>
          <h3 style={styles.cardTitle}>Attendance Trends</h3>
          <div style={styles.chartContainer}>
            <div style={styles.chartLegend}>
              <span>Attendance Rate: 66%</span>
              <span>Total Visits: 12</span>
            </div>
            <div style={styles.barArea}>
              {[40, 70, 20, 90, 60, 80].map((h, i) => (
                <div key={i} style={{ ...styles.bar, height: `${h}%` }}>
                  <span style={styles.barLabel}>M{i+1}</span>
                </div>
              ))}
            </div>
            <p style={{ textAlign: 'center', fontSize: '12px', color: '#7f8c8d', marginTop: '15px' }}>
              6-Month Attendance Frequency
            </p>
          </div>
        </section>
      </div>

      {showApptModal && (
        <AppointmentModal 
          patientId={data.id}
          patientName={data.name}
          onClose={() => setShowApptModal(false)}
          onSubmit={(formData) => console.log('Appointment scheduled:', formData)}
        />
      )}
    </div>
  );
};

const styles = {
  container: { padding: '30px', backgroundColor: '#f4f7f6', minHeight: '100vh', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
  backBtn: { background: 'none', border: 'none', color: '#2c6eb5', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' },
  scheduleBtn: { padding: '10px 20px', backgroundColor: '#2c6eb5', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  addNewBtn: { padding: '10px 20px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  mainGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  card: { backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' },
  cardTitle: { margin: '0 0 20px 0', fontSize: '18px', color: '#2c3e50', borderBottom: '1px solid #eee', paddingBottom: '10px' },
  detailsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
  label: { fontSize: '12px', color: '#7f8c8d', marginBottom: '2px', display: 'block' },
  upcomingBox: { backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #2c6eb5' },
  btnGroup: { display: 'flex', gap: '10px', marginTop: '15px' },
  completeBtn: { flex: 1, padding: '8px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' },
  notifyBtn: { flex: 1, padding: '8px', backgroundColor: '#2c6eb5', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeader: { textAlign: 'left', borderBottom: '2px solid #f4f7f6' },
  th: { padding: '12px 8px', color: '#7f8c8d', fontSize: '13px' },
  td: { padding: '12px 8px', color: '#34495e', fontSize: '14px' },
  tableRow: { borderBottom: '1px solid #f9f9f9' },
  chartContainer: { padding: '10px' },
  chartLegend: { display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '14px', color: '#2c3e50', fontWeight: '600' },
  barArea: { height: '150px', display: 'flex', alignItems: 'flex-end', gap: '15px', borderBottom: '2px solid #eee', paddingBottom: '5px' },
  bar: { flex: 1, backgroundColor: '#3498db', borderRadius: '4px 4px 0 0', position: 'relative' },
  barLabel: { position: 'absolute', bottom: '-25px', left: '50%', transform: 'translateX(-50%)', fontSize: '10px', color: '#7f8c8d' }
};

export default AddPatient;