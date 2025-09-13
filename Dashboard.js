import React, { useEffect, useState } from 'react';

export default function Dashboard({ token }) {
  const [stats, setStats] = useState({});
  useEffect(() => {
    fetch('/admin/dashboard', {
      headers: { Authorization: token }
    })
      .then(res => res.json())
      .then(setStats);
  }, [token]);
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>Total Users: {stats.usersCount}</div>
      <div>Total Stores: {stats.storesCount}</div>
      <div>Total Ratings: {stats.ratingsCount}</div>
    </div>
  );
}