import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  card: {
    backgroundColor: '#f0f8ff', 
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    maxWidth: '300px',
    margin: '0 auto',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  errorMessage: {
    color: 'red',
    marginTop: '8px',
  },
};

function ALogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://192.168.243.1:3000/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
      const data = await response.json();

      localStorage.setItem('token', data.token);

      navigate('/admindashboard');
    } else {
      setError('Authentication failed. Please check your credentials.');
    }
  };

  return (
    <div style={styles.card}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label style={styles.label}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <label style={styles.label}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
        {error && <p style={styles.errorMessage}>{error}</p>}
      </form>
    </div>
  );
}

export default ALogin;
