
import React from 'react';
import { Typography, Container, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { AddCircleOutline } from '@mui/icons-material';


const BenefitsContainer = styled('div')({
  backgroundColor: '#f5f5f5',
  padding: '50px 0',
});

const ImageWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& img': {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    transition: 'all 0.3s ease',
  },
  '&:hover img': {
    transform: 'scale(1.2)',
  },
});

// Benefits component
function Benefits() {
  return (
    <BenefitsContainer>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Benefits of Using Our Platform
        </Typography>
        <Grid container spacing={3}>
          {benefits.map((benefit, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper style={{ padding: '20px', textAlign: 'center' }}>
                <ImageWrapper>
                  <img src={benefit.image} alt={benefit.title} />
                </ImageWrapper>
                <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
                  {benefit.title}
                </Typography>
                <Typography variant="body1">{benefit.description}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </BenefitsContainer>
  );
}


const benefits = [
  {
    title: 'Benefit 1',
    description: 'Description for Benefit 1.',
    image: '/path/to/your/image1.jpg',
  },
  {
    title: 'Benefit 2',
    description: 'Description for Benefit 2.',
    image: '/path/to/your/image2.jpg',
  },
  {
    title: 'Benefit 3',
    description: 'Description for Benefit 3.',
    image: '/path/to/your/image3.jpg',
  },
  {
    title: 'Benefit 4',
    description: 'Description for Benefit 4.',
    image: '/path/to/your/image4.jpg',
  },
];

export default Benefits; 
