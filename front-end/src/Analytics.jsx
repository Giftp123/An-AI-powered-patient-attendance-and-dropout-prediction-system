import React from 'react';

const Analytics = () => {
  return (
    <div style={{ marginTop: '30px', padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
      <h3 style={{ color: '#2c3e50' }}>No-Show & Dropout Trends</h3>
      <div style={{ height: '150px', display: 'flex', alignItems: 'flex-end', gap: '10px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        <div style={{ flex: 1, height: '60%', backgroundColor: '#3498db', borderRadius: '4px' }}></div>
        <div style={{ flex: 1, height: '80%', backgroundColor: '#3498db', borderRadius: '4px' }}></div>
        <div style={{ flex: 1, height: '45%', backgroundColor: '#3498db', borderRadius: '4px' }}></div>
        <div style={{ flex: 1, height: '90%', backgroundColor: '#3498db', borderRadius: '4px' }}></div>
      </div>
      <p style={{ fontSize: '12px', color: '#7f8c8d', marginTop: '10px' }}>Monthly Attendance Overview</p>
    </div>
  );
};

export default Analytics;