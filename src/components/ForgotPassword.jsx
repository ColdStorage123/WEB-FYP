/* import React, { useState } from 'react';

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleSendCode = async () => {
    try {
      console.log("Email:", email);
      console.log("Verification Code:", verificationCode);
      
      const response = await fetch('http://192.168.243.1:3000/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert('Verification Code Sent\nCheck your email for the verification code.');
      } else {
        alert('Error\nFailed to send verification code. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Error\nAn error occurred. Please try again.');
    }
  };

  const handleResetPassword = async () => {
    try {
      if (newPassword !== confirmNewPassword) {
        alert('Error\nNew Password and Confirm Password do not match.');
        return;
      }

      const response = await fetch('http://192.168.243.1:3000/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, verificationCode, newPassword }),
      });

      if (response.ok) {
        alert('Password Reset Successful\nYour password has been reset successfully.');
        // Optionally, navigate the user to the login screen
      } else {
        alert('Error\nFailed to reset password. Please check your information and try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Error\nAn error occurred. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <input
        style={styles.input}
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button style={styles.button} onClick={handleSendCode}>Send Verification Code</button>
      <br></br>
      <input
        style={styles.input}
        placeholder="Verification Code"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <input
        style={styles.input}
        placeholder="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        style={styles.input}
        placeholder="Confirm New Password"
        type="password"
        value={confirmNewPassword}
        onChange={(e) => setConfirmNewPassword(e.target.value)}
      />
      <button style={styles.button} onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
  },
  input: {
    marginBottom: '12px',
    padding: '10px',
    borderWidth: '1px',
    borderColor: '#ccc',
    borderRadius: '5px',
    width: '100%',
    maxWidth: '300px',
  },
  button: {
    backgroundColor: 'ForestGreen',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    maxWidth: '300px', 
  },
};

export default Forgot; */




import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const ForgotPassword = ({ }) => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const passwordRegex = /.{8,}/;
    return passwordRegex.test(password);
  };

  const handleSendCode = async () => {
    try {
      console.log("Sending verification code...");
      console.log("Email:", email);

      const response = await fetch('http://192.168.0.109:3000/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert('Verification Code Sent', 'Check your email for the verification code.');
      } else {
        const errorResponse = await response.json();
       alert('Error', `Failed to send verification code. ${errorResponse.error}`);
      }
    } catch (error) {
      console.error(error);
      alert('Error', 'An error occurred. Please try again.');
    }
  };

  const handleResetPassword = async () => {
    try {
      console.log("Resetting password...");
      console.log("Email:", email);
      console.log("Verification Code:", verificationCode);
      console.log("New Password:", newPassword);

      const response = await fetch('http://192.168.0.106:3000/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, verificationCode, newPassword }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const resetToken = responseData.token;
        const userRole = responseData.role;

        console.log("Reset password response:", responseData);
        localStorage.setItem('token', data.token); // Save the JWT token to localStorage
          localStorage.setItem('userData', JSON.stringify(data.userData));
          console.log('userData',data.userData);
          const data = await response.json();

       alert('Password Reset Successful', 'Your password has been reset successfully.', [
          {
            text: 'OK',
            onPress: () => {
              if (data.userData.role === 'Manager') {
                localStorage.setItem('token', data.token);
                navigate('/manager-home'); // Navigate to the Manager home page
              } else if (data.userData.role === 'Farmer') {
                localStorage.setItem('token', data.token);
                navigate('/farmerhome'); // Navigate to the Farmer home page
              } else if (data.userData.role === 'Admin') {
                localStorage.setItem('token', data.token);
                navigate('/admindashboard'); // Navigate to the Farmer home page
              }
            },
          },
        ]);
      } else {
        const errorResponse = await response.json();
       alert('Error', `Failed to reset password. ${errorResponse.error}`);
      }

    } catch (error) {
      console.error(error);
     alert('Error', 'An error occurred. Please try again.');
    }
  };

  return (
    <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>RESET PASSWORD</Typography>
      <TextField
        sx={{ marginBottom: 2, width: 300 }}
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSendCode} sx={{ marginBottom: 2 }}>Send Verification Code</Button>
      <TextField
        sx={{ marginBottom: 2, width: 300 }}
        label="Verification Code"
        variant="outlined"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <TextField
        sx={{ marginBottom: 2, width: 300 }}
        label="Password"
        variant="outlined"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleResetPassword}>Reset Password</Button>
    </Box>
  );
};

export default ForgotPassword;
