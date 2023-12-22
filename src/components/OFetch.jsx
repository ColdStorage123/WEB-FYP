import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const loggedInUserId = localStorage.getItem('_id');
      try {
        const response = await axios.get(`http://192.168.243.1:3000/fetchOrderDetails?managerid=${loggedInUserId}`);
        setOrderDetails(response.data.orderPlacement);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <div>
      {orderDetails ? (
        <div>
          <h2>Order Details</h2>
          <p>Farmer ID: {orderDetails.farmerId}</p>
          <p>Crop Quantity: {orderDetails.cropQuantity}</p>
          <p>Selected Start Date: {orderDetails.selectedStartDate}</p>
          <p>Storage Days: {orderDetails.storageDays}</p>
          <p>User Requirements: {orderDetails.userRequirements}</p>
         
        </div>
      ) : (
        <p>Loading order details...</p>
      )}
    </div>
  );
};

export default OrderDetails;
