import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Button,
  Modal,
} from '@mui/material';
import FNav from './FNav';
import { useNavigate } from 'react-router-dom';

const Alert = () => {
 const [order, setOrders] = useState([]);
  const navigate = useNavigate();
  const [filteredStatus, setFilteredStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let user = localStorage.userData;
    user = JSON.parse(user);
    if (user) {
      const userId = user._id;

      const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];

      fetch(`http://192.168.243.1:3000/farmerorders?farmerId=${userId}`)
        .then((response) => response.json())
        .then((data) => {
          // Merge fetched data with stored viewed status from local storage
          const mergedOrders = data.map(orderItem => ({
            ...orderItem,
            viewed: storedOrders.includes(orderItem._id),
          }));
          setOrders(mergedOrders);
        })
        .catch((error) => {
          console.error('Error fetching orders:', error);
        });
    }
  }, []);
  const filteredOrders = order
    .filter((orderItem) => {
      if (filteredStatus === '') {
        return true;
      }
      return orderItem.status === filteredStatus;
    })
    .sort((a, b) => b._id.localeCompare(a._id));

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openModal = (orderItem) => {
    setSelectedOrder(orderItem);
    setIsModalOpen(true);
    // Mark the order as viewed and update local storage
    const updatedOrders = order.map(item =>
      item._id === orderItem._id ? { ...item, viewed: true } : item
    );
    setOrders(updatedOrders);
    const viewedOrders = updatedOrders.filter(item => item.viewed).map(item => item._id);
    localStorage.setItem('orders', JSON.stringify(viewedOrders));
  };
  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <FNav />
      <h1>Your Orders</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {currentOrders.map((orderItem) => (
          <Card
            key={orderItem._id}
            style={{
              margin: '10px',
              minWidth: '200px',
              backgroundColor: orderItem.viewed ? 'white' : 'grey',
            }}
          >
            <CardContent>
              <h2>Order ID: {orderItem._id}</h2>
              <p>Status: {orderItem.status}</p>
              <Button variant="outlined" color="primary" onClick={() => openModal(orderItem)}>
                View Here
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal open={isModalOpen} onClose={closeModal}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          {selectedOrder && (
            <div>
              <h2>Order Details</h2>
              <p>Order ID: {selectedOrder._id}</p>
              <p>Status: {selectedOrder.status}</p>
              {/* Add more order details here */}
            </div>
          )}
          <Button variant="outlined" color="primary" onClick={closeModal}>
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Alert;
