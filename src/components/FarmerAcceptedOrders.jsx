import React, { useEffect, useState } from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import FNav from './FNav';
import { useNavigate } from 'react-router-dom';

const FarmerAcceptedOrders = () => {
  const [order, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let user = localStorage.userData;
    user = JSON.parse(user);
    if (user) {
      const userId = user._id;

      fetch(`http://192.168.243.1:3000/farmerorders?farmerId=${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setOrders(data);
        })
        .catch((error) => {
          console.error('Error fetching orders:', error);
        });
    }
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
     
      setOrders((prevOrders) => {
        return prevOrders.map((orderItem) => {
          if (orderItem.status === 'Accepted') {
            return {
              ...orderItem,
              timerText: calculateTimeRemaining(orderItem.selectedStartDate, orderItem.selectedEndDate),
            };
          }
          return orderItem;
        });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []); 
  const handleReviewClick = (managerid) => {

   navigate(`/reviews/${managerid}`);
  
  };

  const calculateTimeRemaining = (startDate, endDate) => {
    const startTime = new Date(startDate).getTime();
    const endTime = new Date(endDate).getTime();
    const currentTime = new Date().getTime();

  
    const timeRemaining = endTime - currentTime;
  
    if (timeRemaining <= 0) {
      return 'Order Completed';
    }
  
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  
    return `Time remaining: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  };
  

  return (
    <div>
      <FNav />
      <h1 style={{ textDecoration: 'none', color: 'green', marginTop: '10px', textAlign: 'center' }} ><strong>Order Status</strong> </h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Manager ID</strong></TableCell>
              <TableCell><strong>Crop Quantity</strong></TableCell>
              <TableCell><strong>Selected Start Date</strong></TableCell>
              <TableCell><strong>Storage Days</strong></TableCell>
              <TableCell><strong>Your Requirements</strong></TableCell>
              <TableCell><strong>Selected End Date</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Remaining Time</strong></TableCell>
              <TableCell><strong>Review</strong></TableCell>
             
              <TableCell>Images</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order
              .filter((orderItem) => orderItem.status === 'Accepted')
              .map((orderItem) => (
                <TableRow key={orderItem._id}>
                  <TableCell>{orderItem.managerid}</TableCell>
                  <TableCell>{orderItem.cropQuantity}</TableCell>
                  <TableCell>{orderItem.selectedStartDate}</TableCell>
                  <TableCell>{orderItem.storageDays}</TableCell>
                  <TableCell>{orderItem.userRequirements}</TableCell>
                  <TableCell>{orderItem.selectedEndDate}</TableCell>
                  <TableCell>{orderItem.status}</TableCell>
                  <TableCell>{orderItem.timerText}</TableCell>
                  <TableCell>
                    {orderItem.timerText === 'Order Completed' && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleReviewClick(orderItem.managerid)}
                        style={{ whiteSpace: 'nowrap' }}
                      >
                        Give Review
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>{orderItem.images}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FarmerAcceptedOrders;