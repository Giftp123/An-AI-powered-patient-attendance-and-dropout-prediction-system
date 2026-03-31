import React, { useState } from 'react';

const SearchPatients = ({ onBack, onViewPatient }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const patients = [
    { id: "PAT001", name: "Alice Kamau", age: 34, gender: "Female", phone: "+254 712 345 678", email: "alice.k@email.com", lastVisit: "2024-03-10", risk: "High", score: "82%", status: "Active" },
    { id: "PAT002", name: "John Mutua", age: 45, gender: "Male", phone: "+254 722 987 654", email: "john.m@email.com", lastVisit: "2024-03-15", risk: "Low", score: "12%", status: "Stable" },
    { id: "PAT003", name: "Sarah Chen", age: 29, gender: "Female", phone: "+254 733 111 222", email: "sarah.c@email.com", lastVisit: "2024-02-28", risk: "Medium", score: "45%", status: "Pending" },
    { id: "PAT004", name: "David Ochieng", age: 52, gender: "Male", phone: "+254 711 000 999", email: "david.o@email.com", lastVisit: "2024-03-01", risk: "High", score: "78%", status: "Critical" },
  ];

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || patient.risk === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>← Back to Dashboard</button>
        <h2 style={{ margin: 0 }}>Search Patients</h2>
      </header>

      <div style={styles.searchSection}>
        <input 
          type="text" 
          placeholder="Search by patient name..." 
          style={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div style={styles.filterGroup}>
          <span>Filter by Risk:</span>
          {['All', 'High', 'Medium', 'Low'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
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
        {filteredPatients.map(patient => (
          <div key={patient.id} style={styles.patientCard}>
            <div style={styles.cardHeader}>
              <h3 style={{ margin: 0 }}>{patient.name}</h3>
              <span style={{ 
                ...styles.badge, 
                backgroundColor: patient.risk === 'High' ? '#e74c3c' : patient.risk === 'Medium' ? '#f39c12' : '#27ae60' 
              }}>
                {patient.risk} Risk
              </span>
            </div>
            <div style={styles.cardBody}>
              <p><strong>Age:</strong> {patient.age}</p>
              <p><strong>Last Visit:</strong> {patient.lastVisit}</p>
              <p><strong>Risk Score:</strong> <span style={{ color: '#2c3e50', fontWeight: 'bold' }}>{patient.score}</span></p>
              <p><strong>Status:</strong> {patient.status}</p>
            </div>
            <button 
              style={styles.viewBtn} 
              onClick={() => onViewPatient(patient)}
            >
              View Full Profile
            </button>
          </div>
        ))}
        {filteredPatients.length === 0 && (
          <p style={{ textAlign: 'center', width: '100%', color: '#7f8c8d' }}>No patients found matching your criteria.</p>
        )}
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
  }
};

export default SearchPatients;