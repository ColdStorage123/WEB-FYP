
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Button, Typography, Divider } from '@mui/material';
import ANav from './ANav';



const AcceptedCSR2 = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  const [acceptedStorages, setAcceptedStorages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    fetch('http://192.168.243.1:3000/accepted-storages', {
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
    <ANav />
    <div style={{ margin: '0 auto', padding: '20px', maxWidth: '1200px' }}>
     
      <h1>Accepted Cold Storages</h1>
  
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {acceptedStorages.map(storage => (
          <Card key={storage.managerid} variant="outlined" style={{ width: '350px', height: '200px' }}>
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
           
            </CardContent>
            <Divider />
          </Card>
        ))}
      </div>
    </div>
    </div>
  );
};

export default AcceptedCSR2;


