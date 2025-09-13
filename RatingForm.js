import React, { useState } from 'react';

export default function RatingForm({ storeId, token }) {
  const [value, setValue] = useState(1);
  const submitRating = async () => {
    await fetch('/rating', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify({ storeId, value })
    });
    alert('Rating submitted!');
  };
  return (
    <div>
      <select value={value} onChange={e => setValue(Number(e.target.value))}>
        {[1,2,3,4,5].map(v => <option key={v} value={v}>{v}</option>)}
      </select>
      <button onClick={submitRating}>Submit/Update Rating</button>
    </div>
  );
}