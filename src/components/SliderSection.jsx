import React, { useState, useEffect } from 'react';
import { Typography, Box, Container } from '@mui/material';

const images = [
  'ourlogo.png', 
  'image2.jpg',
  'image3.jpg',
];

const SliderSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change slide every 3 seconds (3000 milliseconds)

    return () => {
      clearInterval(interval); // Clear the interval on component unmount
    };
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <Box style={{ position: 'relative', width: '100%', height: '500px', overflow: 'hidden' }}>
      {images.map((image, index) => (
        <div
          key={index}
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${images[currentImageIndex]})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            position: 'absolute',
            transition: 'background-image 0.5s ease-in-out',
            opacity: index === currentImageIndex ? 1 : 0,
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Container maxWidth="md">
              <Typography variant="h4" align="center" color="primary" gutterBottom>
                Your Text Here
              </Typography>
            </Container>
          </div>
        </div>
      ))}
    </Box>
  );
};

export default SliderSection;
