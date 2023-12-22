
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const Profile = () => {
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
  });

  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');

  const [isNameEditable, setIsNameEditable] = useState(false);
  const [isPhoneNumberEditable, setIsPhoneNumberEditable] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:3000/getUserData', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setNewName(userData.fullName);
        setNewPhoneNumber(userData.phoneNumber);
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleNameEdit = () => {
    setIsNameEditable(true);
  };

  const handlePhoneNumberEdit = () => {
    setIsPhoneNumberEditable(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:3000/updateUserData', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: newName,
          phoneNumber: newPhoneNumber,
        }),
      });

      if (response.ok) {
        console.log('Profile updated successfully');
        setIsNameEditable(false);
        setIsPhoneNumberEditable(false);
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Typography variant="h4">Profile Update</Typography>
      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
        <TextField
          label="Name"
          variant="outlined"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          disabled={!isNameEditable}
        />
        <Button
          variant="contained"
          onClick={isNameEditable ? handleSave : handleNameEdit}
        >
          {isNameEditable ? 'Save' : 'Edit'}
        </Button>

        {/* Email field (read-only) */}
        <TextField
          label="Email"
          variant="outlined"
          value={user.email}
          disabled
        />

        <TextField
          label="Phone Number"
          variant="outlined"
          value={newPhoneNumber}
          onChange={(e) => setNewPhoneNumber(e.target.value)}
          disabled={!isPhoneNumberEditable}
        />
        <Button
          variant="contained"
          onClick={isPhoneNumberEditable ? handleSave : handlePhoneNumberEdit}
        >
          {isPhoneNumberEditable ? 'Save' : 'Edit'}
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
