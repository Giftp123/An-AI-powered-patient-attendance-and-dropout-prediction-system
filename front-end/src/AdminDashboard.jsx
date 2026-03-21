import React, { useState } from 'react';

const AdminDashboard = ({ user, onLogout, onCreateStaff }) => {
  const [staffList, setStaffList] = useState([
    { id: "STF001", name: "Dr. Nelson Mwangi", role: "Chief Clinician", department: "Outpatient", status: "Active", patients: 12 },
    { id: "STF002", name: "Sarah Wanjiku", role: "Nurse Practitioner", department: "Pediatrics", status: "Active", patients: 8 },
    { id: "STF003", name: "Kevin Otieno", role: "Clinic Admin", department: "Administration", status: "On Leave", patients: 0 },
    { id: "STF004", name: "Dr. Maria Gomez", role: "Specialist", department: "Cardiology", status: "Active", patients: 15 },
  ]);

  const stats = {
    totalStaff: 24,
    activeStaff: 18,
    systemUptime: "99.9%",
    pendingRequests: 3
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h2 style={{ margin: 0 }}>System Admin Control Panel</h2>
          <span style={{ fontSize: '12px', color: '#7f8c8d' }}>
            Administrator: {user.email} | Last Login: Today, 08:30 AM
          </span>
        </div>
        <button onClick={onLogout} style={styles.logoutBtn}>Logout</button>
      </header>

      {/* Admin Overview & Capacity */}
      <div style={styles.statsRow}>
        <div style={styles.card}>
          <p style={styles.statLabel}>Total Clinical Staff</p>
          <h3 style={styles.statValue}>{stats.totalStaff}</h3>
        </div>
        <div style={styles.card}>
          <p style={styles.statLabel}>Staff at Capacity</p>
          <h3 style={styles.statValue}>{stats.activeStaff} / {stats.totalStaff}</h3>
          <div style={styles.progressBar}><div style={{ ...styles.progress, width: '75%' }}></div></div>
        </div>
        <div style={styles.card}>
          <p style={styles.statLabel}>Pending Access Requests</p>
          <h3 style={{ ...styles.statValue, color: '#e67e22' }}>{stats.pendingRequests}</h3>
        </div>
        <div style={styles.card}>
          <p style={styles.statLabel}>System Health</p>
          <h3 style={{ ...styles.statValue, color: '#27ae60' }}>{stats.systemUptime}</h3>
        </div>
      </div>

      {/* Staff Management Section */}
      <section style={styles.tableSection}>
        <div style={styles.tableHeaderRow}>
          <h3 style={{ margin: 0 }}>Clinical Staff Directory</h3>
          <button style={styles.addBtn} onClick={onCreateStaff}>
            + Create New Staff Account
          </button>
        </div>

        <table style={styles.table}>
          <thead>
            <tr style={styles.thRow}>
              <th style={styles.th}>Staff ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Role / Department</th>
              <th style={styles.th}>Assigned Patients</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map((staff) => (
              <tr key={staff.id} style={styles.tr}>
                <td style={styles.td}><strong>{staff.id}</strong></td>
                <td style={styles.td}>{staff.name}</td>
                <td style={styles.td}>
                  <div style={{ fontSize: '14px' }}>{staff.role}</div>
                  <div style={{ fontSize: '12px', color: '#7f8c8d' }}>{staff.department}</div>
                </td>
                <td style={styles.td}>{staff.patients} Patients</td>
                <td style={styles.td}>
                  <span style={{
                    ...styles.statusBadge,
                    backgroundColor: staff.status === 'Active' ? '#eafaf1' : '#fef5e7',
                    color: staff.status === 'Active' ? '#27ae60' : '#e67e22'
                  }}>
                    {staff.status}
                  </span>
                </td>
                <td style={styles.td}>
                  <button style={styles.editBtn}>Edit Access</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

const styles = {
  container: { padding: '30px', backgroundColor: '#f0f2f5', minHeight: '100vh', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', backgroundColor: 'white', padding: '15px 25px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },
  logoutBtn: { padding: '8px 16px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  statsRow: { display: 'flex', gap: '20px', marginBottom: '30px' },
  card: { flex: 1, backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
  statLabel: { margin: '0 0 10px 0', color: '#7f8c8d', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase' },
  statValue: { margin: 0, fontSize: '24px', color: '#2c3e50' },
  progressBar: { height: '6px', backgroundColor: '#eee', borderRadius: '3px', marginTop: '10px' },
  progress: { height: '100%', backgroundColor: '#3498db', borderRadius: '3px' },
  tableSection: { backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },
  tableHeaderRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  addBtn: { padding: '10px 20px', backgroundColor: '#2c3e50', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  table: { width: '100%', borderCollapse: 'collapse' },
  thRow: { borderBottom: '2px solid #f0f2f5' },
  th: { padding: '15px 10px', textAlign: 'left', color: '#7f8c8d', fontSize: '13px', fontWeight: 'bold' },
  td: { padding: '15px 10px', borderBottom: '1px solid #f0f2f5', color: '#2c3e50' },
  statusBadge: { padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' },
  editBtn: { padding: '6px 12px', backgroundColor: '#f8f9fa', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }
};

export default AdminDashboard;