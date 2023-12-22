import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Button, Typography, Divider } from '@mui/material';
import FNav from './FNav';
import { Link } from 'react-router-dom';

const AcceptedCSR1 = () => {
  const [acceptedStorages, setAcceptedStorages] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login'
    }
  }, []);

  useEffect(() => {
    // Fetch accepted cold storages from the server
    fetch('http://localhost:3000/accepted-storages', {
      method: 'GET',
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

  const handlePlaceOrder = managerid => {
    navigate(`/order/${managerid}`);
  };

  return (
    <div>
       <FNav />
    <div style={{ margin: '0 auto', padding: '20px', maxWidth: '1200px' }}>
     
      <h1>Accepted Cold Storages</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {acceptedStorages.map(storage => (
          <Card key={storage.managerid} variant="outlined" style={{ width: '350px', height: '250px' }}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <Typography variant="h5" component="div">
                Manager {storage.managerid}
              </Typography>
              <div>
                <Typography variant="body2" color="text.secondary">
                  <strong>Cold Storage Name:</strong> {storage.coldStorageName}
                  <br />
                  <strong>Description:</strong> {storage.description}
                  <br />
                  <strong>Capacity:</strong> {storage.capacity}
                  <br />
                  <strong>Location:</strong> {storage.location}
                </Typography>
              </div>
              <Button onClick={() => handlePlaceOrder(storage.managerid)} variant="contained" color="primary">
                Place Order
              </Button>
              <Link to={`/viewreviews/${storage.managerid}`}>View Reviews</Link>
            </CardContent>
            <Divider />
          </Card>
        ))}
      </div>
    </div>
    </div>
  );
};

export default AcceptedCSR1;
