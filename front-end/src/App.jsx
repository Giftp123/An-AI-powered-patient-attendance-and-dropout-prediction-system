import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import StaffDashboard from './components/StaffDashboard';
import SearchPatients from './SearchPatients';
import AddPatient from './AddPatient';
import AdminDashboard from './components/AdminDashboard';
import CreateStaff from './components/CreateStaff';

function App() {
  // const [user, setUser] = useState(null);
  // const [currentView, setCurrentView] = useState('dashboard');
  // const [selectedPatient, setSelectedPatient] = useState(null);

  // const handleLogin = (email) => {
  //   const role = email.includes('admin') ? 'System Administrator' : 'Clinic Staff';
  //   setUser({ email, role });
  // };

  // const handleLogout = () => {
  //   setUser(null);
  //   setCurrentView('dashboard');
  //   setSelectedPatient(null);
  // };

  // const navigateToPatient = (patient) => {
  //   setSelectedPatient(patient);
  //   setCurrentView('patientDetails');
  // };

  // const renderView = () => {
  //   if (user.role === 'System Administrator') {
  //     if (currentView === 'dashboard') {
  //       return <AdminDashboard user={user} onLogout={handleLogout} onCreateStaff={() => setCurrentView('createStaff')} />;
  //     }
  //     if (currentView === 'createStaff') {
  //       return <CreateStaff onBack={() => setCurrentView('dashboard')} />;
  //     }
  //   }

  //   switch (currentView) {
  //     case 'dashboard':
  //       return (
  //         <Dashboard 
  //           user={user} 
  //           onLogout={handleLogout} 
  //           onNavigateToSearch={() => setCurrentView('search')}
  //           onViewPatient={navigateToPatient}
  //         />
  //       );
  //     case 'search':
  //       return (
  //         <SearchPatients 
  //           onBack={() => setCurrentView('dashboard')} 
  //           onViewPatient={navigateToPatient}
  //         />
  //       );
  //     case 'patientDetails':
  //       return (
  //         <AddPatient 
  //           patient={selectedPatient} 
  //           onBack={() => setCurrentView('search')} 
  //         />
  //       );
  //     default:
  //       return <Dashboard user={user} onLogout={handleLogout} />;
  //   }
  // };

  return (
    // <div>
    //   {!user ? (
    //     <Login onLogin={handleLogin} />
    //   ) : (
    //     renderView()
    //   )}
    // </div>

    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/admin_dashboard" element={<AdminDashboard />}/>
      <Route path="/create_staff" element={<CreateStaff />}/>
      <Route path="/staff_dashboard" element={<StaffDashboard />}/>
      <Route path="/patient_space" element={<SearchPatients />}/>

    </Routes>
  );
}

export default App;