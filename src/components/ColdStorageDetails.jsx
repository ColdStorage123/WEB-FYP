import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ColdStorageDetails = () => {
  const [coldStorageData, setColdStorageData] = useState(null);

  useEffect(() => {
    
    const currentUserId = localStorage.getItem('currentUserId');

    axios.get(`/api/storage/${currentUserId}`)
      .then(response => {
       
        setColdStorageData(response.data.coldStorage);
      })
      .catch(error => {
        console.error('Error fetching cold storage details:', error);
      });
  }, []); 

  return (
    <div>
      <h2>Cold Storage Details</h2>
      {coldStorageData ? (
        <div>
          <p>Cold Storage Name: {coldStorageData.coldStorageName}</p>
          <p>Description: {coldStorageData.description}</p>
          <p>Capacity: {coldStorageData.capacity}</p>
          <p>Location: {coldStorageData.location}</p>

        </div>
      ) : (
        <p>Loading cold storage details...</p>
      )}
    </div>
  );
};

export default ColdStorageDetails;
