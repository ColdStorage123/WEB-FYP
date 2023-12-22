import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const images = ['image.jpg', 'crops.jpg', 'cold.jpeg'];

const ImageSlider = () => {
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      showArrows={true}
      showThumbs={false}
      showStatus={false}
      showIndicators={false}
    >
      {images.map((image, index) => (
        <div key={index} style={{ position: 'relative', textAlign: 'center' }}>
          <img style={{ maxHeight: '500px', width: '100%' }} src={image} alt={`Img ${index + 1}`}  />
          <Card
            style={{
              
             position: 'absolute',
               top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            //  marginTop: '120px'
            }}
          >
            <CardContent>
              <Grid container alignItems="center" justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h4" align="center">
                    {index === 0
                      ? 'Empowering Farmers Preserving Harvests'
                      : index === 1
                      ? 'Safeguard your precious crops'
                      : 'Revolutionize your farming experience!'}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" align="center">
                    {index === 0
                      ? 'Connect with local ColdStorages to preserve Crops'
                      : index === 1
                      ? 'Ensuring freshness and quality year-round'
                      : 'Say goodbye to post-harvest losses as we connect farmers directly with trusted cold storages'}
                  </Typography>
                </Grid>
                {index === 0 && (
                  <Grid item xs={12}>
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                      <Button variant="contained" color="primary" size="large" style={{ margin: '10px' }}>
                        Register
                      </Button>
                    </Link>
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                      <Button variant="contained" color="primary" size="large" style={{ margin: '10px' }}>
                        Login
                      </Button>
                    </Link>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        </div>
      ))}
    </Carousel>
  );
};

export default ImageSlider;
