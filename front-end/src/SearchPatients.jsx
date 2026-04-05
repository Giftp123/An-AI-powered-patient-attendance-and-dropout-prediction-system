import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchPatients } from './hooks/usePatient';
import PatientsRiskChart from './components/PatientsRiskChart';
import PatientsEngagementChart from './components/PatientsEngagementChart';

const SearchPatients = ({ onBack, onViewPatient }) => {
  const { patients: fetchedPatients, loading: patientsLoading, error: patientsError } = useFetchPatients();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [showCharts, setShowCharts] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 8;

  // console.log(fetchedPatients);

  const navigate = useNavigate();

  const filteredPatients = fetchedPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || patient.risk_level === filter;
    return matchesSearch && matchesFilter;
  });

  const indexOfLast = currentPage * patientsPerPage;
  const indexOfFirst = indexOfLast - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  if (patientsError) {
    return (
      <div style={{
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#ff2a2a"
      }}>
        <h3>{patientsError}</h3>
      </div>
    );}

  if (patientsLoading) {
    return (
      <div style={{
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#7f8c8d"
      }}>
        <h3>Loading patient profiles...</h3>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button onClick={()=>navigate("/staff_dashboard")} style={styles.backBtn}>← Back to Dashboard</button>
        <h2 style={{ margin: 0 }}>Search Patients</h2>
      </header>

      <button 
        onClick={() => setShowCharts(prev => !prev)}
        style={styles.toggleBtn}
      >
        {showCharts ? "Hide Analytics ▲" : "Show Analytics ▼"}
      </button>

      {showCharts && (
        <div style={styles.chartsRow}>
          <div style={{ ...styles.card, flex: 1, borderTop: '4px solid #e74c3c' }}>
            <p style={styles.statLabel}>Patient Risk Distribution</p>
            <PatientsRiskChart patients={fetchedPatients}/>
          </div>

          <div style={{ ...styles.card, flex: 1, borderTop: '4px solid #e74c3c' }}>
            <p style={styles.statLabel}>Patient Status Distribution</p>
            <PatientsEngagementChart patients={fetchedPatients}/>
          </div>
        </div>
      )}      

      <div style={styles.searchSection}>
        <input 
          type="text" 
          placeholder="Search by patient name..." 
          style={styles.searchInput}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <div style={styles.filterGroup}>
          <span>Filter by Risk:</span>
          {['All', 'High', 'Medium', 'Low'].map(f => (
            <button 
              key={f}
              onClick={() => {
                setFilter(f);
                setCurrentPage(1);
              }}
              style={{
                ...styles.filterBtn,
                backgroundColor: filter === f ? '#2c6eb5' : 'white',
                color: filter === f ? 'white' : '#2c3e50',
                border: filter === f ? 'none' : '1px solid #ddd'
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.patientGrid}>
        {currentPatients.map(patient => (
          <div key={patient._id} style={styles.patientCard}>
            <div style={styles.cardHeader}>
              <h3 style={{ margin: 0 }}>{patient.name}</h3>
              <span style={{ 
                ...styles.badge, 
                backgroundColor: patient.risk_level === 'High' ? '#e74c3c' : patient.risk_level === 'Medium' ? '#f39c12' : '#27ae60' 
              }}>
                {patient.risk_level} Risk
              </span>
            </div>
            <div style={styles.cardBody}>
              <p><strong>Age:</strong> {patient.age}</p>
              <p><strong>Gender:</strong> {patient.gender}</p>
              <p><strong>Attendance History:</strong> {patient.no_shows} No-Shows</p>
              <p><strong>Lead Time Days:</strong> <span style={{ color: '#2c3e50', fontWeight: 'bold' }}>{patient.lead_time_days}</span></p>
              <p><strong>Status:</strong> {patient.engagement_status}</p>
            </div>
            <button 
              style={styles.viewBtn} 
              onClick={() => navigate(`/view_patients/${patient._id}`)}
            >
              View Full Profile
            </button>
          </div>
        ))}
        {filteredPatients.length === 0 && (
          <p style={{ textAlign: 'center', width: '100%', color: '#7f8c8d' }}>No patients found matching your criteria.</p>
        )}
      </div>

      <div style={styles.pagination}>
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={styles.pageBtn}
        >
          ← Prev
        </button>

        <span style={{ margin: '0 10px' }}>
          Page {currentPage} of {totalPages}
        </span>

        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={styles.pageBtn}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '40px', backgroundColor: '#f0f4f8', minHeight: '100vh', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
  header: { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' },
  backBtn: { background: 'none', border: 'none', color: '#2c6eb5', cursor: 'pointer', fontWeight: '700', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' },
  searchSection: { 
    backgroundColor: 'white', 
    padding: '30px', 
    borderRadius: '20px', 
    boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
    marginBottom: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    border: '1px solid #e1e8ed'
  },
  searchInput: { padding: '16px 20px', borderRadius: '12px', border: '2px solid #f0f4f8', fontSize: '16px', outline: 'none', backgroundColor: '#f8fafc', transition: 'border-color 0.2s' },
  filterGroup: { display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#627d98', fontWeight: '600' },
  filterBtn: { padding: '8px 20px', borderRadius: '10px', cursor: 'pointer', transition: 'all 0.2s ease', fontWeight: '700', fontSize: '13px' },
  patientGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' },
  patientCard: { 
    backgroundColor: 'white', 
    padding: '25px', 
    borderRadius: '20px', 
    boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    borderTop: '6px solid #2c6eb5',
    transition: 'transform 0.2s ease',
    cursor: 'default'
  },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  badge: { color: 'white', padding: '5px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' },
  cardBody: { fontSize: '14px', color: '#334e68', lineHeight: '1.8' },
  viewBtn: { 
    marginTop: '10px', 
    padding: '12px', 
    backgroundColor: '#f1f5f9', 
    border: 'none', 
    borderRadius: '10px', 
    cursor: 'pointer', 
    fontWeight: '700', 
    color: '#2c6eb5',
    transition: 'all 0.2s ease'
  },
  pagination: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageBtn: {
    padding: '8px 12px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    cursor: 'pointer',
    borderRadius: '6px'
  },
  chartsRow: {
    display: 'flex',
    gap: '20px',
    marginTop: '20px',
    alignItems: 'stretch'
  },
  toggleBtn: {
    marginTop: '10px',
    marginBottom: '20px',
    padding: '10px 14px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#2c6eb5',
    color: 'white',
    cursor: 'pointer',
    fontWeight: '600'
  }  
};

export default SearchPatients;