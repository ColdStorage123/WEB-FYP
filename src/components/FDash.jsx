import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Link } from 'react-router-dom';

const MDash = () => {
  const cardStyle = {
    width: '200px',
    marginBottom: '20px', 
    borderRadius: '15px'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px', alignItems: 'center' }}>
      <Card style={cardStyle}>
        <CardActionArea component={Link} to="/manage-order-requests">
          <CardContent>
            <Typography variant="h5">Order Now!!</Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card style={cardStyle}>
        <CardActionArea component={Link} to="/update-profile">
          <CardContent>
            <Typography variant="h5">Update Your Profile</Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card style={cardStyle}>
        <CardActionArea component={Link} to="/view-rating">
          <CardContent>
            <Typography variant="h5">View Rating</Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card style={cardStyle}>
        <CardActionArea component={Link} to="/storage">
          <CardContent>
            <Typography variant="h5">Track Orders</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default MDash;
