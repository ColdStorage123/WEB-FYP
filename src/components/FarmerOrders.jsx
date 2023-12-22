import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import FNav from './FNav';
import { useNavigate } from 'react-router-dom';

const FarmerOrders = () => {
  const [order, setOrders] = useState([]);
  const navigate = useNavigate();
  const [filteredStatus, setFilteredStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user && user.role !== 'Farmer') {
      navigate('/access-denied'); 
    }
  }, [navigate]);

 
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

 /*  const filteredOrders = order.filter((orderItem) => {
    if (filteredStatus === '') {
      return true;
    }
    return orderItem.status === filteredStatus;
  }); */
  const filteredOrders = order
  .filter((orderItem) => {
    if (filteredStatus === '') {
      return true;
    }
    return orderItem.status === filteredStatus;
  })
  .sort((a, b) => b._id.localeCompare(a._id));


  // Logic for pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <FNav />
      <h1>Your Orders</h1>

      <FormControl fullWidth variant="outlined" style={{ marginBottom: 20 }}>
        <Select
          value={filteredStatus}
          onChange={(e) => setFilteredStatus(e.target.value)}
          label="Filter by Status"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="pending">pending</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
          <MenuItem value="Accepted">Accepted</MenuItem>
        </Select>
      </FormControl>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>Order ID</TableCell>
              <TableCell>Manager ID</TableCell>
              <TableCell>Crop Quantity</TableCell>
              <TableCell>Selected Start Date</TableCell>
              <TableCell>Storage Days</TableCell>
              <TableCell>Your Requirements</TableCell>
              <TableCell>Selected End Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Images</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentOrders.map((orderItem) => (
              <TableRow key={orderItem._id}>
                <TableCell>{orderItem._id}</TableCell>
                <TableCell>{orderItem.managerid}</TableCell>
                <TableCell>{orderItem.cropQuantity}</TableCell>
                <TableCell>{orderItem.selectedStartDate}</TableCell>
                <TableCell>{orderItem.storageDays}</TableCell>
                <TableCell>{orderItem.userRequirements}</TableCell>
                <TableCell>{orderItem.selectedEndDate}</TableCell>
                <TableCell>{orderItem.status}</TableCell>
                <TableCell>{orderItem.images}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {Array.from({ length: Math.ceil(filteredOrders.length / ordersPerPage) }).map((_, index) => (
          <span
            key={index}
            onClick={() => paginate(index + 1)}
            style={{ cursor: 'pointer', margin: '0 5px', textDecoration: 'underline' }}
          >
            {index + 1}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FarmerOrders;
