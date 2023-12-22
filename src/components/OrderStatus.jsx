import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OrderStatus() {
  const [orders, setOrders] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    
    axios
      .get('http://localhost:3000/getorders')
      .then((response) => setOrders(response.data))
      .catch((err) => console.log(err));
  }, []);

  const acceptOrder = (orderId) => {
    
  };

  const rejectOrder = (orderId) => {
    
  };

  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };

  const buttonStyle = {
    marginRight: '10px', 
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
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px', backgroundColor: '#4CAF50', color: 'white' }}>Quantity</th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px', backgroundColor: '#4CAF50', color: 'white' }}>Start date</th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px', backgroundColor: '#4CAF50', color: 'white' }}>End Date</th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px', backgroundColor: '#4CAF50', color: 'white' }}>Days</th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px', backgroundColor: '#4CAF50', color: 'white' }}>Req</th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px', backgroundColor: '#4CAF50', color: 'white' }}>Image</th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px', backgroundColor: '#4CAF50', color: 'white' }}>Action</th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px', backgroundColor: '#4CAF50', color: 'white' }}>Comments</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '' }}>
              <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{order.cropQuantity}</td>
              <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{order.selectedStartDate}</td>
              <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{order.selectedEndDate}</td>
              <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{order.storageDays}</td>
              <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{order.userRequirements}</td>
              <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>
               
              </td>
              <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>
                <button onClick={() => acceptOrder(order.id)} style={{ ...acceptButtonStyle, ...buttonStyle }}>Accept</button>
                <button onClick={() => rejectOrder(order.id)} style={{ ...rejectButtonStyle, ...buttonStyle }}>Reject</button>
              </td>
              <td colSpan="7" style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}> 
              <label htmlFor="comment">Comments:</label>
              <input type="text" id="comment" name="comment" value={comment} onChange={handleChangeComment} style={{ width: '100%', padding: '5px' }} />
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

export default OrderStatus;
