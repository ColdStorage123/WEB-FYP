import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const PaymentComponent = () => {
  const { orderId, farmerId } = useParams();
  const location = useLocation();
  const orderDetails = location.state;
  const [transitionId, setTransitionId] = useState('');

  // Implement your payment logic here using orderId, farmerId, orderDetails, and transitionId
  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    // Perform payment processing logic using transitionId, orderId, farmerId, and orderDetails
    console.log('Transition ID:', transitionId);
    console.log('Order ID:', orderId);
    console.log('Farmer ID:', farmerId);
    console.log('Order Details:', orderDetails);
    
    // Add logic for payment processing and order confirmation here
  };

  return (
    <div>
      <h2>Payment Details for Order ID: {orderId}</h2>
      <h3>Farmer ID: {farmerId}</h3>
      {/* Display order details from the state */}
      {orderDetails && (
        <div>
          <h4>Order Details:</h4>
          <p>Crop Quantity: {orderDetails.cropQuantity}</p>
          <p>Selected Start Date: {orderDetails.selectedStartDate}</p>
          <p>Storage Days: {orderDetails.storageDays}</p>
          {/* Add more order details as needed */}
        </div>
      )}
      {/* Payment form with Transition ID text field */}
      <form onSubmit={handlePaymentSubmit}>
        <label>
          Enter Transition ID:
          <input
            type="text"
            value={transitionId}
            onChange={(e) => setTransitionId(e.target.value)}
            placeholder="Enter transition ID"
            required
          />
        </label>
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default PaymentComponent;
