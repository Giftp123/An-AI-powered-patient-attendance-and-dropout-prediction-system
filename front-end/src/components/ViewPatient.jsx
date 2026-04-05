import React, { useState } from 'react';
import apiClient from '../services/apiClient';
import { useNavigate } from 'react-router-dom';
import AppointmentModal from './AppointmentModal';
import InterventionModal from './InterventionModal';
import { useParams } from 'react-router-dom';
import { useGetPatientById, useGetPatientAppointments } from '../hooks/usePatient';
import PatientAnalytics from './PatientAnalytics';

const ViewPatient = ({ onBack }) => {
  const { id } = useParams();
  const { patient, loading: patientLoading, error: patientError } = useGetPatientById(id);
  const { patientAppts, loading: appointmentsLoading, error: appointmentsError } = useGetPatientAppointments(id);  

  const [selectedAppt, setSelectedAppt] = useState(null);
  const [showApptModal, setShowApptModal] = useState(false);
  const [showCharts, setShowCharts] = useState(true);

  const upcomingAppointment = patientAppts?.filter(appt => appt.status === "Scheduled")
  .sort((a, b) => new Date(a.appointment_date) - new Date(b.appointment_date))[0];

  const formatTime = (time) => {
    if (!time) return "";
    const [hour, minute] = time.split(":");
    const h = Number(hour);
    const suffix = h >= 12 ? "PM" : "AM";
    const adjusted = h % 12 || 12;
    return `${adjusted}:${minute} ${suffix}`;
  };

  const handleUpdate = async (id, data) => {
    try {
      const response = await apiClient.put(`/appointments/${id}`, data);
      alert("Appointment update successful!");      
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
  

  const navigate = useNavigate()
  // console.log(patient);
  // console.log(patientAppts);  

  if (patientError || appointmentsError) {
  return (
    <div style={{
      height: "50vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "#ff2a2a"
    }}>
      <h3>{patientError || appointmentsError}</h3>
    </div>
  );}

  if (patientLoading || appointmentsLoading) {
    return (
      <div style={{
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#7f8c8d"
      }}>
        <h3>Loading patient details...</h3>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button onClick={()=>navigate("/view_patients")} style={styles.backBtn}>← Search Patients</button>
          <h2 style={{ margin: 0 }}>Patient Profile: {patient.name}</h2>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={styles.scheduleBtn} onClick={() => setShowApptModal(true)}>
            Schedule Appointment
          </button>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={styles.scheduleBtn} onClick={() => navigate("/staff_dashboard")}>
            Appointments Dashboard
          </button>
        </div>
      </header>

      <div style={styles.mainGrid}>
        {/* Patient Details Section */}
        <section style={styles.card}>
          <h3 style={styles.cardTitle}>Personal Details</h3>
          <div style={styles.detailsGrid}>
            <div><label style={styles.label}>Patient ID:</label><p>{patient._id}</p></div>
            <div><label style={styles.label}>Age / Gender:</label><p>{patient.age} / {patient.gender}</p></div>
            <div><label style={styles.label}>Engagement Status:</label><p>{patient.engagement_status}</p></div>
            <div><label style={styles.label}>Email:</label><p>{patient.email}</p></div>
            <div>
              <label style={styles.label}>Risk Status:</label>
              <p style={{ color: patient.risk_level === 'High' ? '#e74c3c' : '#27ae60', fontWeight: 'bold' }}>
                {patient.risk_level}
              </p>
            </div>
          </div>
        </section>

        {/* Upcoming Appointment Section */}
        <section style={styles.card}>
          <h3 style={styles.cardTitle}>Upcoming Appointment</h3>
          <div style={styles.upcomingBox}>
            {upcomingAppointment ? (
              <>
                <p>
                  <strong>Scheduled Date:</strong>{" "}
                  {upcomingAppointment.appointment_date} at {formatTime(upcomingAppointment.appointment_time)}
                </p>
                <p><strong>Doctor / Nurse:</strong> {upcomingAppointment.staff.name}</p>
                <p><strong>Purpose:</strong> {upcomingAppointment.appointment_details}</p>
                <div style={styles.btnGroup}>
                  <button 
                    style={styles.completeBtn} 
                    onClick={() => handleClosing(upcomingAppointment._id)}
                  >
                    Mark Complete
                  </button>
                  <button 
                    style={styles.notifyBtn} 
                    onClick={() => setSelectedAppt(upcomingAppointment)}
                  >
                    Notify Patient
                  </button>
                  <button 
                    style={styles.completeBtn} 
                    onClick={() => handleCancelling(upcomingAppointment._id)}
                  >
                    Cancel Appointment
                  </button>
                </div>
              </>
            ) : (
              <p style={{ color: "#7f8c8d" }}>
                No upcoming appointments.
              </p>
            )}
          </div>
        </section>

        <button 
          onClick={() => setShowCharts(prev => !prev)}
          style={styles.toggleBtn}
        >
          {showCharts ? "Hide Analytics ▲" : "Show Analytics ▼"}
        </button>

        {showCharts && (
          <div style={styles.chartsRow}>
            <div style={{ ...styles.card, flex: 1, borderTop: '4px solid #e74c3c' }}>
              <p style={styles.statLabel}>Appointment History Chart</p>
              <PatientAnalytics appointments={patientAppts}/>
            </div>
          </div>
        )}  

        {/* Past Appointments Section */}
        <section style={{ ...styles.card, gridColumn: 'span 2' }}>
          <h3 style={styles.cardTitle}>Past Appointments</h3>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Time</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Doctor</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {patientAppts.map((apt, i) => (
                <tr key={i} style={styles.tableRow}>
                  <td style={styles.td}>{apt.appointment_date}</td>
                  <td style={styles.td}>{formatTime(apt.appointment_time)}</td>
                  <td style={styles.td}>{apt.appointment_details}</td>
                  <td style={styles.td}>{apt.staff.name}</td>
                  <td style={styles.td}>
                    <span style={{ 
                      color: apt.status === 'Completed' ? '#27ae60' : 'Scheduled' ? '#2756ae' : '#e74c3c',
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

        {selectedAppt && (
          <InterventionModal 
            appt={selectedAppt} 
            onClose={() => setSelectedAppt(null)} 
          />
        )}
      </div>

      {showApptModal && (
        <AppointmentModal 
          patientId={patient._id}
          patientName={patient.name}
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

export default ViewPatient;