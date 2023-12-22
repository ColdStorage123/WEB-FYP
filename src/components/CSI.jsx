import React, { useState, useEffect } from 'react';

const ColdStorageInfo = () => {
  const [coldStorageInfo, setColdStorageInfo] = useState({});
  const userId = '...'; 
 
  const [id, setuserId] = useState('');
  useEffect(() => {
        
    let user = localStorage.userData;
    user = JSON.parse(user)

    console.log(user);
    if (user) {
      const user_id = user._id;
      console.log(user_id)
      setuserId(user_id);
      
    } 
  }, []);
  useEffect(() => {
    console.log(userId)
    // Fetch cold storage data based on the user ID from the backend
    fetch(`http://192.168.243.1:3000/storage/${id}`)
      .then((response) => response.json())
      .then((data) => { console.log(data)
        setColdStorageInfo(data);
      })
      .catch((error) => {
        console.error('Error fetching cold storage data', error);
      });
  }, [id]);

  return (
    <div>
      <h2>Cold Storage Information</h2>
      <p><strong>Name:</strong> {coldStorageInfo.coldStorageName}</p>
      <p><strong>Status:</strong> {coldStorageInfo.status}</p>
      <p>{id}</p> 
    </div>
  );
};

export default ColdStorageInfo;
