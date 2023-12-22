import React, { useEffect, useState } from 'react';
import MNav from './MNav';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material'; 
import { Fade } from "@mui/material";

const AcceptedOrders = () => {
  const [order, setOrders] = useState([]);
/*   const [fullName, setfullName] = useState('');
  const [_id, setuser_id] = useState('');
  const [email, setEmail] = useState(''); */

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login'
    }
  }, []);
  
 
  useEffect(() => {
    let user = localStorage.userData;
    user = JSON.parse(user);
    if (user) {
      const userId = user._id;
  
      fetch(`http://localhost:3000/ordered?managerid=${userId}&status=accepted`)
        .then((response) => response.json())
        .then((data) => {
          console.log('API response:', data);
  
          // Check if the data is an array, if not, convert it to an array
          const ordersArray = Array.isArray(data) ? data : [data];
  
          setOrders(ordersArray);
        })
        .catch((error) => {
          console.error('Error fetching accepted orders:', error);
        });
    }
  }, []);
  const handleCancelOrder = (orderId, farmerId) => {
    fetch(`http://localhost:3000/updateOrderStatus/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'Cancelled' }),
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
    <div>
      <MNav />
      <h1 style={{ textDecoration: 'none', color: 'green', marginTop: '10px', textAlign: 'center' }} ><strong>Accepted Orders</strong> </h1>
      <Grid container spacing={2}>
        {order
         .filter((order) => order.status === 'Accepted')
         .map((order) => (
            <Grid item key={order._id} xs={12} sm={6} md={4}>
              <Fade in={true} timeout={500}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Farmer ID: {order.farmerId}</Typography>
                  <Typography>Crop Quantity: {order.cropQuantity}</Typography>
                  <Typography>Selected Start Date: {order.selectedStartDate}</Typography>
                  <Typography>Storage Days: {order.storageDays}</Typography>
                  <Typography>User Requirements: {order.userRequirements}</Typography>
                  <Typography>Selected End Date: {order.selectedEndDate}</Typography>
                  <Typography>Images: {order.images}</Typography>
                  <Button onClick={() => handleCancelOrder(order._id, order.farmerId)} variant="contained" color="primary">
  Cancel Order
</Button>
                </CardContent>
              </Card>
              </Fade>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default AcceptedOrders;
