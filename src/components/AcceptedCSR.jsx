import React, { useEffect, useState } from 'react';

const AcceptedCSR = () => {
  const [acceptedStorages, setAcceptedStorages] = useState([]);

  useEffect(() => {

    fetch('http://192.168.243.1:3002/accepted-storages', {
      method: 'GET'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => setAcceptedStorages(data))
    .catch(error => console.error('Error fetching accepted cold storages', error));
  }, []);
  

  return (
    <div>
      <h1>Accepted Cold Storages</h1>
      <ul>
        {acceptedStorages.map(storage => (
          <li key={storage._id}>
            <strong>Cold Storage Name:</strong> {storage.coldStorageName}<br />
            <strong>Description:</strong> {storage.description}<br />
            <strong>Capacity:</strong> {storage.capacity}<br />
            <strong>Location:</strong> {storage.location}<br />
      
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AcceptedCSR;
