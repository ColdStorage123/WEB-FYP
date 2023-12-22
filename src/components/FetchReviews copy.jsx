import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FetchReviewsM = () => {
  const { managerid } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    let user = localStorage.userData;
    user = JSON.parse(user);
    if (user) {
      const userId = user._id; 
  
    fetch(`http://192.168.243.1:3000/viewreviews/managerid=${userId}`, {
      method: 'GET',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setReviews(data))
      .catch(error => console.error('Error fetching reviews', error));
 } }, [managerid]);

  return (
    <div>
      <h1>Reviews for Manager {managerid}</h1>
      <ul>
        {reviews.map(review => (
          <li key={review._id}>
            <strong>Rating:</strong> {review.rating}<br />
            <strong>Review:</strong> {review.reviewText}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchReviewsM;
