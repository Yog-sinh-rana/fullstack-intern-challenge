import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import StoreList from './components/StoreList';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');

  if (!user)
    return (
      <div>
        <Login setUser={setUser} setToken={setToken} setRole={setRole} />
        <Signup setUser={setUser} />
      </div>
    );
  else if (role === 'admin') return <Dashboard token={token} />;
  else if (role === 'user') return <StoreList token={token} />;
  else return <div>Store Owner Dashboard Coming Soon</div>;
}

export default App;