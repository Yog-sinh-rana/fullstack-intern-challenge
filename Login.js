import React, { useState } from 'react';

export default function Login({ setUser, setToken, setRole }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async () => {
    const res = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok) {
      setUser(data);
      setToken(data.token);
      setRole(data.role);
    } else {
      alert(data.error);
    }
  };
  return (
    <div>
      <h2>Login</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}