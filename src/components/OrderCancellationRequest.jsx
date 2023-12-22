
import React, { useEffect, useState } from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import FNav from './FNav';
import { useNavigate } from 'react-router-dom';

const OrderCancel = () => {
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
      <FNav />
      <h1 style={{ textDecoration: 'none', color: 'green', marginTop: '10px', textAlign: 'center' }} ><strong>Order Status</strong> </h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell><strong>OrderID</strong></TableCell>
              <TableCell><strong>Manager ID</strong></TableCell>
              <TableCell><strong>Crop Quantity</strong></TableCell>
              <TableCell><strong>Selected Start Date</strong></TableCell>
              <TableCell><strong>Selected End Date</strong></TableCell>
              <TableCell><strong>Storage Days</strong></TableCell>
              <TableCell><strong>Your Requirements</strong></TableCell>
             
              <TableCell><strong>Status</strong></TableCell>
         
            </TableRow>
          </TableHead>
          <TableBody>
            {order
              .filter((orderItem) => orderItem.status === 'pending')
              .map((orderItem) => (
                <TableRow key={orderItem._id}>
                  <TableCell>{orderItem._id}</TableCell>
                  <TableCell>{orderItem.managerid}</TableCell>
                  <TableCell>{orderItem.cropQuantity}</TableCell>
                  <TableCell>{orderItem.selectedStartDate}</TableCell>
                  <TableCell>{orderItem.selectedEndDate}</TableCell>
                  <TableCell>{orderItem.storageDays}</TableCell>
                  <TableCell>{orderItem.userRequirements}</TableCell>
                 
                  <TableCell>{orderItem.status}</TableCell>
                 
          
                   <TableCell>
                  
                    <Button
                      variant="contained"
                      color="secondary" 
                  onClick={() => handleCancelOrder(orderItem._id)}
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      Cancel Order
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

export default OrderCancel;
 

/* import React, { useEffect, useState } from 'react';
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
  const handlePayNowClick = (orderId, farmerId) => {
    // Fetch specific order details based on orderId and farmerId
    fetch(`http://192.168.243.1:3000/orderDetails/${orderId}`)
      .then((response) => response.json())
      .then((orderDetails) => {
        // Navigate to the payment page with specific order details as URL parameters
        navigate(`/payment/${orderId}/${farmerId}`, { state: orderDetails });
      })
      .catch((error) => {
        console.error('Error fetching order details:', error);
        // Handle error, show a message to the user, etc.
      });
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
              <TableCell><strong>Images</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
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
                    <Button onClick={() => handlePayNowClick(orderItem._id)} variant="contained" color="primary">
                      Pay Now
                    </Button>
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


 */