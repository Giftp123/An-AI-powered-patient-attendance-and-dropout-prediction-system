import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);  // Set login state to null

  // const handleLogin = (email) => {
  //   // Role-based access control setup [cite: 24]
  //   const role = email.includes('admin') ? 'System Administrator' : 'Clinic Staff';
  //   setUser({ email, role });
  // };

  const navigate = useNavigate()

  const handleLogin = (userData) => {
    setUser(userData);
    setLoggedIn(true);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <div>
      <Routes>
        {/* <Route path="/login" element={<Login onLogin={handleLogin} />} /> */}      
        {!loggedIn ? (
          <Route path="/" element={<Login onLogin={handleLogin} />} />
        ) : (
          <Route path = "/dashboard" element = {<Dashboard user={user} onLogout={handleLogout} />} />
        )}
      </Routes>
    </div>
      
  );
}

export default App;