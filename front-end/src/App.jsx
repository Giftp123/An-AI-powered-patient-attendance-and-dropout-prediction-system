import { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (email) => {
    // Role-based access control setup [cite: 24]
    const role = email.includes('admin') ? 'System Administrator' : 'Clinic Staff';
    setUser({ email, role });
  };

  const handleLogout = () => setUser(null);

  return (
    <div>
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;