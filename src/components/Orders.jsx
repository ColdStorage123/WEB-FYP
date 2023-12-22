import React, { useState, useEffect } from 'react';

function Orderss() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://192.168.243.1:3000/orderrs')
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(error => console.error("Error fetching orders:", error));
  }, []);

  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            <p>Farmer ID: {order.farmerId}</p>
            <p>Crop Quantity: {order.cropQuantity}</p>
            <p>Selected Start Date: {order.selectedStartDate}</p>
            <p>Storage Days: {order.storageDays}</p>
            <p>User Requirements: {order.userRequirements}</p>
            <p>Selected End Date: {order.selectedEndDate}</p>
            <p>Images: {order.images}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Orderss;