import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Sidebar from './AdminDashboard/Sidebar';
import ANav from './ANav';


const PendingCSR = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  
  const user = JSON.parse(localStorage.userData); 
  const managerid = user._id;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.only('md'));
  const isTablet = useMediaQuery(theme.breakpoints.only('sm'));
  const [coldStorageRequests, setColdStorageRequests] = useState([]);
  const acceptButtonStyle = {
    backgroundColor: 'green', 
    color: 'white',
    marginRight: '10px' 
  };

  const rejectButtonStyle = {
    backgroundColor: 'red',
    color: 'white', 
  };
 


  useEffect(() => {
    const token = localStorage.getItem('token'); 
    // Fetch only pending cold storage requests from the server
    fetch('http://192.168.243.1:3000/storager?status=pending', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '', 
      },
      
    })
    
      .then((response) => response.json())
      .then((data) => setColdStorageRequests(data))
      .catch((error) =>
        console.error('Error fetching pending cold storage requests', error)
      );
  }, []);



  const token = localStorage.getItem('token'); 
  function handleAccept(coldStorageId) {
    fetch(`http://192.168.243.1:3000/storager/${coldStorageId}/accept`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '', 
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        setColdStorageRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== coldStorageId)
        );
      })
      .catch((error) => {
        console.error('Error accepting storage request', error);
      });
  }
  
  function handleReject(coldStorageId) {
    fetch(`http://192.168.243.1:3000/storager/${coldStorageId}/reject`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '', 
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        setColdStorageRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== coldStorageId)
        );
      })
      .catch((error) => {
        console.error('Error rejecting storage request', error);
      });
  }



 


  return (
    <div>
    <ANav />
     <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="12vh"
    >
     <Typography variant="h1" align="center" style={{ fontSize: '2rem', [theme.breakpoints.up('sm')]: { fontSize: '3rem' } }}>
        Pending Cold Storage Requests
      </Typography>
    </Box>
      <Box display="flex" flexWrap="wrap">
        {coldStorageRequests.map(request => (
          <Card
            key={request._id}
            variant="outlined"
            style={{
              width: isDesktop
                ? 'calc(25% - 32px)' // 4 cards in one line for desktop
                : isMediumScreen
                ? 'calc(33.33% - 32px)' // 3 cards in one line for medium screens
                : isTablet
                ? 'calc(50% - 32px)' // 2 cards in one line for tablets
                : 'calc(100% - 32px)', // 1 card in one line for mobile screens
              margin: '16px',
              borderRadius: 0, // No curved borders
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' // Card shadow
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                {request.coldStorageName}
              </Typography>
              <br></br>
              <Typography color="text.secondary">
              <strong>UserID:</strong> {request.managerid}<br />
                <strong>Description:</strong> {request.description}<br /> 
                <strong>Capacity:</strong> {request.capacity}<br />
                <strong>Location:</strong> {request.location}<br />
                <strong>Phone Number:</strong> {request.phoneNumber}<br />
                <strong>Images:</strong> {request.images.join(', ')}<br />
              </Typography>
              <Button onClick={() => handleAccept(request._id)} style={acceptButtonStyle}>
        Accept
      </Button>
      <Button onClick={() => handleReject(request._id)} style={rejectButtonStyle}>
        Reject
      </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default PendingCSR;
