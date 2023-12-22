import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';

const CallToActionSection = () => {
  return (
    <Box py={8} bgcolor="#007bff" color="#fff">
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Ready to Revolutionize Your Cold Storage Experience?
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Join us today and ensure the freshness and quality of your crops with our cutting-edge cold storage management system.
        </Typography>
        <Box display="flex" justifyContent="center" mt={3}>
          <Button variant="contained" color="secondary" size="large">
            Get Started
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CallToActionSection;
