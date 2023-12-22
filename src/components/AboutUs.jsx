
import React from 'react';
import { Typography, Container, Paper, Avatar } from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';

const AboutUs = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Paper elevation={3} style={{ padding: '2rem', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to our website! We are a team of computer science students pursuing our Bachelor's degree at Comsats
          University Islamabad, Lahore Campus.
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <div style={{ marginRight: '2rem' }}>
            <Avatar alt="Member 1" src="/member1.jpg" sx={{ width: 150, height: 150 }}>
              <PersonIcon style={{ fontSize: 100 }} />
            </Avatar>
            <Typography variant="subtitle1" style={{ marginTop: '1rem' }}>
              Member 1 Name
            </Typography>
          </div>
          <div>
            <Avatar alt="Member 2" src="/member2.jpg" sx={{ width: 150, height: 150 }}>
              <PersonIcon style={{ fontSize: 100 }} />
            </Avatar>
            <Typography variant="subtitle1" style={{ marginTop: '1rem' }}>
              Member 2 Name
            </Typography>
          </div>
        </div>
        <Typography variant="body1" paragraph>
          Our final year project represents our dedication to the field of computer science. We are excited to showcase
          our skills and knowledge through this project.
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions or suggestions, please feel free to get in touch with us. We appreciate your
          interest and support!
        </Typography>
      </Paper>
    </Container>
  );
};

export default AboutUs;
