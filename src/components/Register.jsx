import React, { useState } from 'react';
import { InputAdornment, Container, Grid, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { AccountCircle, Email, Phone, Lock, VpnKey, Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';




const Register = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [role, setRole] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [secretCode, setSecretCode] = useState(''); 
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handlePhoneNumberChange = (text) => {
    const trimmedText = text.trim();
    setPhonenumber(trimmedText);
    setShowError(trimmedText.length > 0 && trimmedText.length !== 11);
  };

  const validateEmail = (email) => {
    const regex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };

  const validateName = (name) => {
    const regex = /^[a-zA-Z \s]+$/;
    return regex.test(name);
  };

  const validatename = (Name) => {
    return Name && validateName(Name);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^\d{11}$/;
    return regex.test(phoneNumber);
  };

  const validatePassword = (password) => {
    const passwordRegex = /.{8,}/; 
    return passwordRegex.test(password);
  };

  const validateConfirmPassword = (confirmpassword) => {
    return confirmpassword === password;
  };

  const handleRegister = async () => {
    if (!validatename(name)) {
      setSnackbarMessage('Error: Enter a Valid first name');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } else if (!validateEmail(email)) {
      setSnackbarMessage('Error: Enter Valid Email');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } else if (!validatePhoneNumber(phonenumber)) {
      setSnackbarMessage('Error: Enter Valid Phone Number (11 digits)');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } else if (!validatePassword(password)) {
      setSnackbarMessage('Error: Enter Valid Password (8 characters)');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } else if (!validateConfirmPassword(confirmpassword)) {
      setSnackbarMessage('Error: Passwords do not match');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } else if (role === '') {
      setSnackbarMessage('Error: Please select a role');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }else {
      const userData = {
        fullName: name,
        email: email,
        password: password,
        confirmPassword: confirmpassword,
        phoneNumber: phonenumber,
        role: role,
        secretCode: secretCode,
      };
      try {
        const response = await fetch('http://localhost:3000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        if (role === 'Admin' && secretCode !== 'THISISCOMSATSUNIVERSITYLAHORE') {
          alert('Error: Invalid secret code. Cannot register as admin.');
          return;
        }

    const data = await response.json();

       
    /*  if (data.error === 'Invalid credentials') {
          setShowError('Invalid credentials');
        } else if (data.message === 'Verification Code Send to Your Email') {
          console.log(data.userData);
          window.alert(data.message);
          navigate('/verification', { state: { userData: data.userData } });
          //navigate('/Login');
          return; } */
        
      
          if (data.error === 'User already exists with this email') {
            setSnackbarMessage(data.error);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
          } else if (data.message === 'User Registered successfully') {
            setSnackbarMessage(data.message);
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            navigate('/login');
          }
        } catch (error) {
          console.error('Error registering user:', error);
          setSnackbarMessage('Failed to register user. Please try again later.');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        }
      }
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <div style={{ flex: 1, backgroundColor: '#bbdefb', padding: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Container maxWidth="1sm">
        <Grid container spacing={2} style={{  borderRadius: '50%', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Grid item xs={14} md={6} style={{ backgroundColor: '#8E44AD', color: 'white', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h6" align="center">Our platform connects Farmers directly with Cold Storages.</Typography>
              <Typography variant="subtitle1" align="center">Join our platform to save your produce</Typography>
          <img src="ourlogo.png" alt="Platform logo" style={{ width: "100%", height: "auto" }} />
        </Grid>

       
        <Grid item xs={12} md={6} style={{ backgroundColor: 'white', color: 'blue'}}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <Typography variant="h4" align="center"><strong>Register Here</strong></Typography>
            </Grid>

            <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
            <TextField
  label="Full Name"
  variant="outlined"
  fullWidth
  value={name}
  placeholder='Enter Your Full Name '
  onChange={(e) => setName(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      document.getElementById('email-input').focus();
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
  id="email-input"
  label="Email"
  variant="outlined"
  fullWidth
  value={email}
  placeholder='Enter Your Email'
  onChange={(e) => setEmail(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      document.getElementById('phone-number-input').focus();
    }
  }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <Email />
      </InputAdornment>
    ),
  }}
  style={{ marginBottom: '16px' }}
/>

<TextField
  id="phone-number-input"
  label="Mobile Number"
  variant="outlined"
  fullWidth
  value={phonenumber}
  placeholder='Enter Your Phone Number'
  onChange={(e) => handlePhoneNumberChange(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      document.getElementById('password-input').focus();
    }
  }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <Phone />
      </InputAdornment>
    ),
  }}
  error={showError}
  helperText={showError && "Phone Number should be 11 digits"}
  style={{ marginBottom: '16px' }}
/>

{/* Rest of the code remains the same for other fields */}

<TextField
  id="password-input"
  label="Password"
  variant="outlined"
  fullWidth
  type={showPassword ? 'text' : 'password'}
  placeholder='Choose Your Password'
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      document.getElementById('confirm-password-input').focus();
    }
  }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <Lock />
      </InputAdornment>
    ),
    endAdornment: (
      <InputAdornment position="end">
        {showPassword ? (
          <VisibilityOff
            onClick={() => setShowPassword(false)}
            style={{ cursor: 'pointer' }}
          />
        ) : (
          <Visibility
            onClick={() => setShowPassword(true)}
            style={{ cursor: 'pointer' }}
          />
        )}
      </InputAdornment>
    ),
  }}
  style={{ marginBottom: '16px' }}
/>

<TextField
  id="confirm-password-input"
  label="Confirm Password"
  variant="outlined"
  fullWidth
  type={showConfirmPassword ? 'text' : 'password'}
  placeholder='Confirm Your Password'
  value={confirmpassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      document.getElementById('role-input').focus();
    }
  }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <VpnKey />
      </InputAdornment>
    ),
    endAdornment: (
      <InputAdornment position="end">
        {showConfirmPassword ? (
          <VisibilityOff
            onClick={() => setShowConfirmPassword(false)}
            style={{ cursor: 'pointer' }}
          />
        ) : (
          <Visibility
            onClick={() => setShowConfirmPassword(true)}
            style={{ cursor: 'pointer' }}
          />
        )}
      </InputAdornment>
    ),
  }}
  style={{ marginBottom: '16px' }}
/>

<FormControl fullWidth variant="outlined" style={{ marginBottom: '16px' }}>
  <InputLabel id="role-label">Register As:</InputLabel>
  
  <Select
    labelId="role-label"
    id="role-input"
    value={role}
    onChange={(e) => setRole(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        document.getElementById('secret-code-input').focus();
      }
    }}
  >
   
    <MenuItem value="">Select an option</MenuItem>
    <MenuItem value="Farmer">Farmer</MenuItem>
    <MenuItem value="Manager">Cold Storage Manager</MenuItem>
    <MenuItem value="Admin">Admin</MenuItem>
  </Select>
  
  {role === 'Admin' && (
    <TextField
      id="secret-code-input"
      label="Secret Code"
      variant="outlined"
      fullWidth
      value={secretCode}
      onChange={(e) => setSecretCode(e.target.value)}
      style={{ marginBottom: '16px' }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          document.getElementById('register-button').click();
        }
      }}
    />
  )}
</FormControl>

<Button
  id="register-button"
  variant="contained"
  color="primary"
  fullWidth
  onClick={handleRegister}
  style={{ marginBottom: '16px' }}
>
  Register
</Button>
<Link to="/login" style={{ textDecoration: 'none', color: 'blue', textAlign: 'center' }}>Already have an account? Login here.</Link>


            </Grid>
            
        </Grid>
      </Grid>
      </Grid>
      
    </Container>
    </div>
    <Snackbar
  open={snackbarOpen}
  autoHideDuration={6000}
  onClose={handleSnackbarClose}
  anchorOrigin={{
    vertical: 'top',
    horizontal: 'right',
  }}
>
  <MuiAlert
    elevation={6}
    variant="filled"
    onClose={handleSnackbarClose}
    severity={snackbarSeverity}
    style={{
      minWidth: '300px', 
      padding: '20px', 
      fontSize: '1.2rem', 
      lineHeight: '1.5', 
    }}
  >
    {snackbarMessage}
  </MuiAlert>
</Snackbar>

      <Footer />
    </div>
   

  );
};

export default Register;