// src/components/Reviews.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';

const ReviewsM = ({ managerId }) => {

  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    let user = localStorage.userData;
    user = JSON.parse(user);
    if (user) {
      const userName = user.fullName;
     
      const userId = user._id;
    }
  }, []);
 

  useEffect(() => {
    const fetchReviews = async (userId) => {
      try {
        const response = await axios.get(`http://192.168.243.1:3000/reviewsm?managerid=${userId}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [managerId]);

  return (
    <div>
      <Typography variant="h4">Reviews</Typography>
      {reviews.map((review) => (
        <div key={review._id}>
          <Typography variant="h6">{review.fullName}</Typography>
          <Typography>Rating: {review.rating}</Typography>
          <Typography>{review.reviewText}</Typography>
        </div>
      ))}
    </div>
  );
};

export default ReviewsM;
