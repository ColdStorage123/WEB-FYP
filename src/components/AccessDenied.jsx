import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AccessDenied = () => {
    const navigate = useNavigate();
  return (
    <Container maxWidth="sm" sx={{ marginTop: 8, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Access Denied
      </Typography>
      <Typography variant="body1" paragraph>
        You don't have permission to access this page.
      </Typography>
     
    </Container>
  );
};

export default AccessDenied;
