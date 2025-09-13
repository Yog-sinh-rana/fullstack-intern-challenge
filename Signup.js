import React, { useState } from 'react';

export default function Signup({ setUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const handleSignup = async () => {
    const res = await fetch('/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, address, password })
    });
    const data = await res.json();
    if (res.ok) {
      setUser(data);
    } else {
      alert(data.error);
    }
  };
  return (
    <div>
      <h2>Sign Up</h2>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}