import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StorageAction() {
  const [storageR, setStorageR] = useState([]);
  const [fullName, setfullName] = useState('');

  const [email, setEmail] = useState('');
    useEffect(() => {
        
        let user = localStorage.userData;
        user = JSON.parse(user)

        console.log(user);
        if (user) {
          const userName = user.fullName;
          setfullName(userName);
          setEmail(user.email);
        } 
      }, []);


  useEffect(() => {
    // Fetch orders from the API
    axios
      .get('http://192.168.243.1:3000/storager')
      .then((response) => setStorageR(response.data))
      .catch((err) => console.log(err));
  }, []);
 

  
  

  const buttonStyle = {
    marginRight: '10px', // Add space between buttons
  };

  const acceptButtonStyle = {
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  };

  const rejectButtonStyle = {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  };

  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
    margin: '20px',
    fontFamily: 'Arial, sans-serif',
  };

  return (
    <div>
      <table style={tableStyle}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px', backgroundColor: '#4CAF50', color: 'white' }}>Full Name</th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px', backgroundColor: '#4CAF50', color: 'white' }}>Email</th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px', backgroundColor: '#4CAF50', color: 'white' }}>Cold Storage Name</th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px', backgroundColor: '#4CAF50', color: 'white' }}>Description</th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px', backgroundColor: '#4CAF50', color: 'white' }}>Capacity</th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px', backgroundColor: '#4CAF50', color: 'white' }}>Location</th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px', backgroundColor: '#4CAF50', color: 'white' }}>Images</th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px', backgroundColor: '#4CAF50', color: 'white' }}>Action</th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px', backgroundColor: '#4CAF50', color: 'white' }}>id</th>
          </tr>
        </thead>
        <tbody>
          {storageR.map((storage, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '' }}>
              <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{fullName}</td>
              <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{email}</td>
              <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{storage.coldStorageName}</td>
              <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{storage.description}</td>
              <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{storage.capacity}</td>
              <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{storage.location}</td>
              <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{storage.userId}</td>
              <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>
  {storage.images.map((image, index) => (
    <img key={index} src={image} alt={`Im/age ${index}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
  ))}
</td>
            </tr>
          ))}
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default StorageAction;
