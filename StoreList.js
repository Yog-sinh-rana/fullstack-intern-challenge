import React, { useEffect, useState } from 'react';
import RatingForm from './RatingForm';

export default function StoreList({ token }) {
  const [stores, setStores] = useState([]);
  useEffect(() => {
    fetch('/rating/stores', {
      headers: { Authorization: token }
    })
      .then(res => res.json())
      .then(setStores);
  }, [token]);
  return (
    <div>
      <h2>Stores</h2>
      {stores.map(store => (
        <div key={store.id}>
          <div>Name: {store.name}</div>
          <div>Address: {store.address}</div>
          <div>Average Rating: {/* Calculate average from store.Ratings */}</div>
          <RatingForm storeId={store.id} token={token} />
        </div>
      ))}
    </div>
  );
}