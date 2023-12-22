// File: src/App.js

import React, { useState } from 'react';
import axios from 'axios';

const Test = () => {
  // State to manage form input values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use axios to send a POST request to the backend API
      const response = await axios.post('http://192.168.243.1:3000/submitForm', { name, email });
      console.log(response.data);
      // Handle success or error messages here
    } catch (error) {
      console.error('Error submitting form', error);
      // Handle error here
    }
  };

  return (
    <div>
      <h1>MERN Stack Form</h1>
      <form onSubmit={handleSubmit}>
        {/* Input for Name */}
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        {/* Input for Email */}
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Test;
