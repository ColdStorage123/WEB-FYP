import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import FNav from './FNav';
import { useNavigate } from 'react-router-dom';

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const { managerid } = useParams();
  const [fullName, setfullName] = useState('');
  const [_id, setuser_id] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let user = localStorage.userData;
    user = JSON.parse(user);
    if (user) {
     // const userName = user.fullName;
      setfullName(user.fullName);
      setEmail(user.email);
      setuser_id(user._id);
    }
  }, []);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user && user.role !== 'Farmer') {
      navigate('/access-denied'); 
    }
  }, [navigate]);

 

  const handleSubmit = () => {
   
    fetch(`http://192.168.243.1:3000/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ managerid, rating, reviewText, fullName }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Review submitted successfully:', data);
       
        setSnackbarOpen(true);

        // After successful submission, navigate back to /farmeracceptedorders route after 2 seconds
        setTimeout(() => {
         
          window.location.href = '/farmeracceptedorders'
        }, 2000);
      })
      .catch((error) => {
        console.error('Error submitting review:', error);
        
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
    <FNav />
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
   
      <h2>Write Your Review</h2>

      <p>Manager ID: {managerid}</p> 
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span>Rating:</span>
        <Rating
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
      </div>
      <br />
      <TextField
        label="Full Name"
        
        rows={4}
        variant="outlined"
        value={fullName}
        disabled
        onChange={(e) => setReviewText(e.target.value)}
      />
      
      <br></br>
      <TextField
        label="Review"
        multiline
        rows={4}
        variant="outlined"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        style={{ width: '500px', height: '100px' }}
      />
      <br></br>
      <br></br>
     
      <Button variant="contained" onClick={handleSubmit}>
        Submit Review
      </Button>
      <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <MuiAlert onClose={handleCloseSnackbar} severity="success" variant="filled">
          Review Submitted Successfully
        </MuiAlert>
      </Snackbar>
    </div>
    </div>
  );
};
export default ReviewForm;