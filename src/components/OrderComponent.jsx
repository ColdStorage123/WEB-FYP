import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, Box, TableHead, TableRow, Paper, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';
const OrderComponent = () => {
  const [order, setOrders] = useState([]);
  const [fullName, setfullName] = useState('');
  const [_id, setuser_id] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  
 

  useEffect(() => {
    let user = localStorage.userData;
    user = JSON.parse(user);
    if (user) {
      const userName = user.fullName;
      setfullName(userName);
      setEmail(user.email);
      setuser_id(user._id);
      const userId = user._id;
    }
  }, []);
 
  useEffect(() => {
    
    let user = localStorage.userData;
    user = JSON.parse(user);
    if (user) {
      const userId = user._id;
  
      fetch(`http://192.168.243.1:3000/ordered?managerid=${userId}&status=pending`)
        .then((response) => response.json())
        .then((data) => {
          setOrders(data);
        })
        .catch((error) => {
          console.error('Error fetching pending orders:', error);
        });
    }
  }, []);

  const handleAcceptOrder = (orderId, farmerId) => {
    fetch(`http://192.168.243.1:3000/updateOrderStatus/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'Accepted' }),
    })
      .then((response) => response.json())
      .then((data) => {
        
        
       
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating order status:', error);
      });
  };
  
  const handleRejectOrder = (orderId, farmerId) => {
    fetch(`http://192.168.243.1:3000/updateOrderStatus/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'Rejected' }),
    })
      .then((response) => response.json())
      .then((data) => {
       
        
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating order status:', error);
      });
  
  
  };

  
    return (
      <div style={{ overflowX: 'auto' }}>
        <Box
     textAlign="center"
    >
      <Typography variant="h4" component="div" fontWeight="bold" mb={2}>
        Pending Orders
        {/* // {email} {_id} */}
      </Typography>
    </Box>
        <TableContainer component={Paper} style={{ border: '1px solid #ccc' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Farmer ID</b></TableCell>
                <TableCell><b>Farmer Email</b></TableCell>
                <TableCell><b>Crop Quantity</b></TableCell>
                <TableCell><b>Selected Start Date</b></TableCell>
                <TableCell><b>Storage Days</b></TableCell>
                <TableCell><b>User Requirements</b></TableCell>
                <TableCell><b>Selected End Date</b></TableCell>
                <TableCell><b>Images</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order
                .filter(order => order.status === 'pending')
                .map(order => (
                  <TableRow key={order._id}>
                    
                    <TableCell>{order.farmerId}</TableCell>
                    <TableCell>{order.farmerEmail}</TableCell>
                    <TableCell>{order.cropQuantity}</TableCell>
                    <TableCell>{order.selectedStartDate}</TableCell>
                    <TableCell>{order.storageDays}</TableCell>
                    <TableCell>{order.userRequirements}</TableCell>
                    <TableCell>{order.selectedEndDate}</TableCell>
                    <TableCell>{order.images}</TableCell>
                    <TableCell>
                    <Button onClick={() => handleAcceptOrder(order._id, order.farmerId)} variant="contained" color="primary">
  Accept
</Button>

                      <br></br>
                      <br></br>
                      <Button onClick={() => handleRejectOrder(order._id)} variant="contained" color="secondary">
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
};

export default OrderComponent;
