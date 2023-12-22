import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const ProblemSolutionSection = () => {
  return (
    <div style={{ backgroundColor: '#E1F5FE', padding: '50px 0' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          
          <Grid item xs={12} md={6}>
            <Typography variant="h5" color="textPrimary" paragraph>
              Problem
            </Typography>
            <Typography variant="body1" color="textPrimary" paragraph>
              The lack of sufficient and reliable cold storage facilities in Pakistan's agricultural sector, particularly
              in rural areas, poses a significant challenge for farmers who aim to export their products. Existing cold
              storage facilities in urban areas suffer from poor quality, outdated equipment, unqualified staff, and
              limited competition, leading to high costs for farmers and crop spoilage.
            </Typography>
          </Grid>

          {/* Image */}
          <Grid item xs={12} md={6}>
            <img
              src="wasted.jpg" 
              alt="Problem Illustration"
              style={{ width: '80%', borderRadius: '8px' }}  
            />
          </Grid>

          {/* Solution Description */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" color="textPrimary" paragraph>
              Solution
            </Typography>
            <Typography variant="body1" color="textPrimary" paragraph>
              This is a platform where we can connect both farmers and cold storages, where farmers can avail services to
              store products in cold storage, and cold storages can generate revenue by selling these services.
            </Typography>
          </Grid>

          {/* Image */}
          <Grid item xs={12} md={6}>
            <img
              src="preserved.png" 
              alt="Solution Illustration"
              style={{ width: '80%', borderRadius: '8px' }}  
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ProblemSolutionSection;
