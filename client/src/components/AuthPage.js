import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography'; // Import Typography from Material-UI
import API_DOMAIN from '../config'; // Import API_DOMAIN from config.js

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [token, setToken] = useState(null); // State to store token data
  const [username, setUsername] = useState(null); // State to store username

  const handleSwitchForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLoginSubmit = (loginData) => {
    // Make API call to server with loginData
    fetch(`${API_DOMAIN}/users/login`, { // Use API_DOMAIN from config.js
      method: 'POST',
      body: JSON.stringify(loginData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        // Set token and username data to state
        setToken(data.token);
        setUsername(data.username);
      })
      .catch(error => {
        // Handle error as needed
        console.error(error);
      });
  };

  const handleRegisterSubmit = (registerData) => {
    // Make API call to server with registerData
    fetch(`${API_DOMAIN}/users/register`, { // Use API_DOMAIN from config.js
      method: 'POST',
      body: JSON.stringify(registerData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        // Set token and username data to state
        setToken(data.token);
        setUsername(data.username);
      })
      .catch(error => {
        // Handle error as needed
        console.error(error);
      });
  };

  return (
    <div>
      {token ? ( // Display welcome message if token exists
        <Typography variant="h6" align="center">
          Welcome, {username}
        </Typography>
      ) : (
        // Display login/register forms if token does not exist
        isLogin ? (
          <LoginForm onSubmit={handleLoginSubmit} />
        ) : (
          <RegisterForm onSubmit={handleRegisterSubmit} />
        )
      )}
      {!token && ( // Display switch form link if token does not exist
        <Link
          component="button"
          variant="body2"
          onClick={handleSwitchForm}
          style={{ marginTop: 10 }}
        >
          {isLogin ? 'Click here to register' : 'Click here to login'}
        </Link>
      )}
    </div>
  );
};

export default AuthPage;
