import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  TextField,
  Button,
  InputAdornment,
  Typography,
  Snackbar,
} from '@mui/material';
import { AccountCircle, Lock } from '@mui/icons-material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import MuiAlert from '@mui/material/Alert';
import Navbar from './Navbar';
import Footer from './Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to login. Please check your credentials.');
      }

      const data = await response.json();

      if (data.error === 'Invalid credentials') {
        // Check if the error is due to wrong email or wrong password
        if (data.message.includes('email')) {
          setSnackbarMessage('Wrong Email');
        } else if (data.message.includes('password')) {
          setSnackbarMessage('Wrong Password');
        } else {
          setSnackbarMessage('Invalid credentials');
        }

        setSnackbarOpen(true);
      } else {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userData', JSON.stringify(data.userData));

        if (data.userData.role === 'Manager') {
          navigate('/manager-home');
        } else if (data.userData.role === 'Farmer') {
          navigate('/farmerhome');
        } else if (data.userData.role === 'Admin') {
          navigate('/admindashboard');
        }
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setSnackbarMessage('Failed to login. Please check your credentials and try again later.');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const message = searchParams.get('message');
    if (message) {
      setShowError(true);
      setSnackbarMessage(message);
      setSnackbarOpen(true);
    }
  }, [location.search]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div
        style={{
          flex: 1,
          backgroundColor: '#bbdefb',
          padding: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            color: 'blue',
            padding: '20px',
            borderRadius: '20px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h4" align="center">
            <strong>Login</strong>
          </Typography>
          <TextField
  label="Email"
  variant="outlined"
  fullWidth
  value={email}
  placeholder="Enter your email"
  onChange={(e) => setEmail(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      document.getElementById('password-input').focus();
    }
  }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <AccountCircle />
      </InputAdornment>
    ),
  }}
  style={{ marginBottom: '16px' }}
/>

<TextField
  id="password-input"
  label="Password"
  variant="outlined"
  fullWidth
  type={showPassword ? 'text' : 'password'}
  placeholder="Enter your password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <Lock />
      </InputAdornment>
    ),
    endAdornment: (
      <InputAdornment
        position="end"
        onClick={() => setShowPassword(!showPassword)}
        style={{ cursor: 'pointer' }}
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </InputAdornment>
    ),
  }}
  style={{ marginBottom: '16px' }}
/>

          {showError && (
            <span style={{ color: 'red', marginTop: '5px', marginBottom: '10px' }}>
              Invalid credentials
            </span>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            style={{ marginBottom: '16px' }}
          >
            Login
          </Button>
          <br />
          <Link
            to="/forgot"
            style={{ textDecoration: 'none', color: 'green', marginTop: '10px', textAlign: 'center' }}
          >
            Forgot Password? Click here
          </Link>
        </div>
      </div>
      <Footer />

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Login;
