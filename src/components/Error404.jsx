import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Container } from '@mui/material';

const Error404 = () => {
  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '100px' }}>
      <Typography variant="h1" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="h5" paragraph>
        Oops! The page you are looking for does not exist.
      </Typography>
      <Typography variant="body1" paragraph>
        The page you are trying to access might have been removed, had its name changed,
        or is temporarily unavailable.
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        Go to Home
      </Button>
    </Container>
  );
};

export default Error404;
