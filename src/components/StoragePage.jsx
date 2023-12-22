import React, { useEffect, useState } from 'react';

const StoragePage = () => {
  const [storageData, setStorageData] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    // Fetch storage details based on the current user's ID
    const fetchStorageDetails = async () => {
      try {
        const response = await fetch(`http://192.168.243.1:3000/storage/${userId}`);
        const data = await response.json();
        setStorageData(data);
      } catch (error) {
        console.error('Error fetching storage details', error);
      }
    };

    fetchStorageDetails();
  }, []);

  return (
    <div> 
      {storageData ? (
        <div>
          <h2>Storage Details</h2>
          <p>Cold Storage Name: {storageData.coldStorageName}</p>
          <p>Description: {storageData.description}</p>
          <p>Capacity: {storageData.capacity}</p>
          <p>Location: {storageData.location}</p>
         
        </div>
      ) : (
        <p>Loading storage details...</p>
      )}
    </div>
  );
};

export default StoragePage;
