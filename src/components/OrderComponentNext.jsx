import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const OrderComponentNext = () => {

  const { orderId, farmerId } = useParams();

  const [mobileNumber, setMobileNumber] = useState('');
  const [requiredDays, setRequiredDays] = useState('');
  const [offeredAmount, setOfferedAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the data to be sent to the server
    const formData = {
        orderId: orderId,
        farmerId: farmerId,
        mobileNumber: mobileNumber,
        requiredDays: parseInt(requiredDays, 10),
        offeredAmount: parseFloat(offeredAmount),
      };
      

    // Send a POST request to the server to save the form data
    fetch('http://192.168.243.1:3000/submitFormData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server if needed
        console.log('Form data submitted successfully:', data);
        // Optionally, you can redirect the user to a thank you page or perform other actions
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error('Error submitting form data:', error);
      });
  };

  return (
    <div>
      <h2>Enter Details for Order ID: {orderId} {farmerId}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Mobile Number:
          <input type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
        </label>
        <br />
        <label>
          Required Number of Days:
          <input type="text" value={requiredDays} onChange={(e) => setRequiredDays(e.target.value)} />
        </label>
        <br />
        <label>
          Offered Amount:
          <input type="text" value={offeredAmount} onChange={(e) => setOfferedAmount(e.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default OrderComponentNext;
