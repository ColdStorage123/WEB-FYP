
import React from 'react';
import { Typography, Container, Grid, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; 


const containerStyle = {
  marginTop: '50px',
  backgroundColor: '#f5f5f5', // Light background color
  padding: '30px',
};

const paperStyle = {
  padding: '1.5rem',
  textAlign: 'center',
  color: 'black',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  height: '100%', 
};

// WhyChooseUs component
function WhyChooseUs() {
  return (
    <Container maxWidth="lg" style={containerStyle}>
      <Typography variant="h4" gutterBottom>
        Why Choose Our Cold Storage Management System?
      </Typography>
      <Grid container spacing={3}>
        {points.map((point, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Paper style={paperStyle}>
              <CheckCircleOutlineIcon style={{ fontSize: 40, color: '#4caf50', marginBottom: '15px' }} /> {/* Icon */}
              <Typography variant="h6" gutterBottom>
                {point.title}
              </Typography>
              <Typography variant="body1">{point.description}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}


// Points to display in the component
const points = [
  {
    title: 'Direct Connection with Cold Storages',
    description:
      'Say goodbye to intermediaries! We bridge the gap between farmers and cold storages, allowing you to connect directly. This direct interaction ensures efficient communication, transparent transactions, and quick processing, saving you time and money.',
  },
  {
    title: 'Preserving Freshness, Ensuring Quality',
    description:
      'Your hard-earned crops deserve the best care. Our state-of-the-art cold storages are equipped with advanced technology to maintain optimal temperature and humidity levels. This ensures that your produce remains fresh, nutritious, and market-ready, preserving its quality and value.',
  },
  {
    title: 'Cost-Effective Solutions',
    description:
      'We believe in fair pricing. Our platform offers competitive rates for storage services, helping you reduce overhead costs. By eliminating unnecessary expenses, you can focus on what matters most – growing your business.',
  },
  {
    title: 'User-Friendly Interface',
    description:
      'Our platform boasts an intuitive, user-friendly interface. Whether you are a tech-savvy farmer or just starting out, you’ll find it easy to navigate. Accessing information, booking storage space, and managing your inventory has never been this straightforward.',
  },
  {
    title: 'Real-Time Monitoring and Alerts',
    description:
      'We empower you with real-time monitoring tools. Keep an eye on your stored crops remotely, receive alerts about temperature fluctuations, and access comprehensive data analytics. This level of control ensures peace of mind, allowing you to focus on other aspects of your farming operations.',
  },
  {
    title: 'Expert Support and Guidance',
    description:
      'Our team of experts is dedicated to your success. From providing technical assistance to offering valuable agricultural insights, we are here to support you every step of the way. Have a question or need advice? Reach out to us – we’re more than happy to help.',
  },
  {
    title: 'Sustainability and Environmental Responsibility',
    description:
      'We are committed to sustainability. Our cold storages are designed with eco-friendly practices in mind, reducing carbon footprint and environmental impact. By choosing us, you contribute to a greener, more sustainable future.',
  },
  {
    title: 'Reliable Security Measures',
    description:
      'Your trust is paramount. That\'s why our cold storages are equipped with robust security measures, including 24/7 surveillance, access control systems, and advanced technology to ensure the safety and security of your crops.',
  },
];

export default WhyChooseUs; // Export the component
