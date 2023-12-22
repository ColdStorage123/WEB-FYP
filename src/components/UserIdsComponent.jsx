import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserIdsComponent() {
  const [userIds, setUserIds] = useState([]);

  useEffect(() => {
  
    axios.get('http://192.168.243.1:3000/storage/userids')
      .then(response => {
        setUserIds(response.data.userIds);
      })
      .catch(error => {
        console.error("Error fetching user IDs:", error);
      });
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <div>
      <h2>User IDs:</h2>
      <ul>
        {userIds.map(userId => (
          <li key={userId}>{userId}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserIdsComponent;
