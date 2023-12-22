import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import FNav from './FNav';
import Rating from '@mui/material/Rating'; 

const MFetchReviewsM = () => {
  const { managerid } = useParams();
  const [reviews, setReviews] = useState([]);
  const [fullName, setFullName] = useState('');
  const [_id, setUser_id] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    let user = localStorage.userData;
    user = JSON.parse(user);
    if (user) {
      setFullName(user.fullName);
      setEmail(user.email);
      setUser_id(user._id);
     
    }
  }, []);

  useEffect(() => {
    let user = localStorage.userData;
    user = JSON.parse(user);
    if (user) {
      const userId = user._id;
      // Fetch reviews based on manager ID from the server
      fetch(`http://192.168.243.1:3000/viewreviewss/${userId}`, {
        method: 'GET',
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // Filter reviews where managerid matches the logged-in user's userid
          const filteredReviews = data.filter(review => review.managerid === userId);
          setReviews(filteredReviews);
        })
        .catch(error => console.error('Error fetching reviews', error));
    }
  }, []);

  return (
    <div>
      <FNav />
      <h1>Reviews for Manager {managerid}</h1>
      {reviews.map(review => (
        <Card key={review._id} variant="outlined" style={{ margin: '10px' }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {review.fullName}
            </Typography>
            <Typography color="text.secondary">
              <strong>Rating:</strong> 
              <Rating
                name="read-only"
                value={review.rating} 
                readOnly 
              />
            </Typography>
            <Typography color="text.secondary">
              <strong>Review:</strong> {review.reviewText}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MFetchReviewsM;
