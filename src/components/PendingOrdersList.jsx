import React, { useEffect, useState } from 'react';

const PendingOrders = () => {
  const [pendingOrders, setPendingOrders] = useState([]);

  useEffect(() => {
    // Fetch pending orders from the server
    fetch('http://192.168.243.1:3000/orders?status=pending', {
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => setPendingOrders(data))
    .catch(error => console.error('Error fetching pending orders', error));
  }, []);

  function handleAccept(orderId) {
    fetch(`http://192.168.243.1:3000/orders/${orderId}/accept`, {
      method: 'PUT'
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      // Remove the accepted order from the list
      setPendingOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
    })
    .catch(error => {
      console.error('Error accepting order', error);
    });
  }

  function handleReject(orderId) {
    fetch(`http://192.168.243.1:3000/orders/${orderId}/reject`, {
      method: 'PUT'
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      // Remove the rejected order from the list
      setPendingOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
    })
    .catch(error => {
      console.error('Error rejecting order', error);
    });
  }

  return (
    <div>
      <h1>Pending Orders</h1>
      <ul>
        {pendingOrders.map(order => (
          <li key={order._id}>
            <strong>Crop Quantity:</strong> {order.cropQuantity}<br />
            <strong>Start Date:</strong> {order.selectedStartDate}<br />
            <strong>Storage Days:</strong> {order.storageDays}<br />
            <strong>User Requirements:</strong> {order.userRequirements}<br />
            <strong>End Date:</strong> {order.selectedEndDate}<br />
            <strong>Images:</strong> {order.images.join(', ')}<br />
            <button onClick={() => handleAccept(order._id)}>Accept</button>
            <button onClick={() => handleReject(order._id)}>Reject</button>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PendingOrders;
