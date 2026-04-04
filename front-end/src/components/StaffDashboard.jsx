import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient';
import InterventionModal from './InterventionModal';
import AppointmentsPieChart from './AppointmentsPieChart';
import AppointmentModal from '../AppointmentModal';
import { useCurrentStaff, useLogoutStaff, fetchAllAppointments, useUpdateAppointment } from '../hooks/useStaff';

export default function StaffDashboard ({ user, onLogout, onNavigateToSearch, onViewPatient }) {
  const { staff, loading: staffLoading, error: staffError } = useCurrentStaff();
  const { appointments: fetchedAppointments, loading: appointmentsLoading, error: appointmentsError } = fetchAllAppointments();
  const { logout, loading: logoutLoading } = useLogoutStaff();

  const navigate = useNavigate();
  
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [showApptModal, setShowApptModal] = useState(false);
  const [apptPatient, setApptPatient] = useState(null);

  // console.log(fetchedAppointments);

  const handleLogout = async () => {
    try {
      await logout();
      alert(`Logout successful! We hope to see you again!`)
      navigate("/login")
    } catch (err) {
      console.error(err);
      alert(`Oops! Something went wrong!`)
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      const response = await apiClient.put(`/appointments/${id}`, data);
      alert("Appointment update successful");      
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Oops! Something went wrong! Please try again.");
    }
  };

  const handleClosing = (apptId) => {
    handleUpdate(apptId, { status: "Completed" });
  };

  const handleCancelling = (apptId) => {
    handleUpdate(apptId, { status: "Cancelled" });
  };

  const handleOpenApptModal = (patient = null) => {
    setApptPatient(patient);
    setShowApptModal(true);
  };

  // const handleAddAppointment = (formData) => {
  //   const newAppt = {
  //     id: `APT${Math.floor(Math.random() * 1000)}`,
  //     patientId: formData.patientId,
  //     patient: formData.patientName,
  //     time: formData.time || "TBD",
  //     date: formData.date,
  //     risk: "Pending",
  //     score: "--",
  //     history: formData.reason
  //   };
  //   setAppointments([newAppt, ...appointments]);
  // };

  if (staffError) return <p>Please log in</p>;
  if (appointmentsError) return <p>{appointmentsError}</p>;

  if (staffLoading || appointmentsLoading) {
      return (
        <div h="50vh" flexdirection="column" gap={4}>
          <h3>Loading dashboard...</h3>
        </div>
      );
  }

  if (logoutLoading) {
      return (
        <div h="50vh" flexdirection="column" gap={4}>
          <h3>Logout in progress...</h3>
        </div>
      );
  }

  return (
    <div style={styles.dashboardContainer}>
      <header style={styles.header}>
          <div>
            <h2 style={{ margin: 0 }}>Hospital Staff Dashboard</h2>
            <span style={{ fontSize: '12px', color: '#7f8c8d' }}>
              Name: {staff.name} | Department: {staff.department} 
            </span>
          </div>
          <button onClick={() => handleOpenApptModal()} style={styles.scheduleBtn}>+ Schedule Appt</button>
          <button style={styles.searchBtn}>Search Patients</button>
          <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
        </header>

      <div style={styles.statsRow}>
        <div style={{ ...styles.card, borderTop: '4px solid #e74c3c' }}>
          <p style={styles.statLabel}>Total Appointments</p>
          <h3>{fetchedAppointments.length}</h3>
          <p style={styles.statLabel}>Appointment Distribution</p>
          <AppointmentsPieChart appointments={fetchedAppointments}/>
        </div>
      </div>

      <section style={styles.tableSection}>
        <h3 style={{ marginBottom: '15px' }}>Appointment Schedule</h3>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>Patient ID</th>
              <th style={styles.th}>Patient Name</th>
              <th style={styles.th}>Time</th>
              <th style={styles.th}>Risk Level</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Appointment Descrpition</th>
              <th style={styles.th}>Trigger Intervention</th>
              <th style={styles.th}>Finalise Appointment</th>
              <th style={styles.th}>Cancel Appointment</th>
            </tr>
          </thead>
          <tbody>
            {fetchedAppointments.map((apt) => (
              <tr key={apt._id} style={styles.tableRow}>
                <td style={styles.td}><strong>{apt.patient_id || 'N/A'}</strong></td>
                <td style={styles.td}>
                  <button 
                    style={{ ...styles.linkBtn, fontWeight: '600' }}
                    // onClick={() => onViewPatient({ 
                    //   id: apt.patient_id,
                    //   name: apt.patient.name, 
                    //   email: apt.patient.email
                    // })}
                  >
                    {apt.patient.name}
                  </button>
                </td>
                <td style={styles.td}>{apt.appointment_date}</td>
                <td style={styles.td}>
                  <span style={{
                    ...styles.badge,
                    backgroundColor: apt.risk === 'High' ? '#e74c3c' : apt.risk === 'Medium' ? '#f39c12' : '#27ae60'
                  }}>
                    {apt.patient.risk_level}
                  </span>
                </td>
                <td style={styles.td}><strong>{apt.status}</strong></td>
                <td style={{ ...styles.td, fontSize: '12px', color: '#7f8c8d' }}>{apt.appointment_details}</td>
                <td style={styles.td}>
                  {apt.status === "Scheduled" && (
                    <button 
                      style={styles.actionBtn} 
                      onClick={() => setSelectedAppt(apt)}
                    >
                      Remind
                    </button>
                  )}
                </td>

                <td style={styles.td}>
                  {apt.status === "Scheduled" && (
                    <button 
                      style={styles.actionBtn} 
                      onClick={() => handleClosing(apt._id)}                  
                    >
                      Close
                    </button>
                  )}
                </td>

                <td style={styles.td}>
                  {apt.status === "Scheduled" && (
                    <button 
                      style={styles.actionBtn} 
                      onClick={() => handleCancelling(apt._id)}               
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {selectedAppt && (
        <InterventionModal 
          appt={selectedAppt} 
          onClose={() => setSelectedAppt(null)} 
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