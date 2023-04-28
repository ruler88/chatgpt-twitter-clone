import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setToken, setUsername } from '../redux/reducers/userReducer'; // Import actions from userSlice
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography'; // Import Typography from Material-UI
import API_DOMAIN from '../config'; // Import API_DOMAIN from config.js

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const token = useSelector(state => state.user.token); // Access token from Redux store
  const username = useSelector(state => state.user.username); // Access username from Redux store

  const dispatch = useDispatch(); // Get dispatch function from Redux

  const handleSwitchForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLogout = () => {
    // Clear token from local storage and reset token and username states
    localStorage.removeItem('token');
    dispatch(clearUser());
  };

  useEffect(() => {
    // Fetch '/api/verify' when component mounts
    const token = localStorage.getItem('token');
    fetch(`${API_DOMAIN}/api/verify`, { // Update endpoint to '/api/verify'
      headers: {
        Authorization: `Bearer ${token}` // Include token in headers if available
      }
    })
      .then(response => response.json())
      .then(data => {
        // Update state with token and username data if available
        dispatch(setToken(token));
        dispatch(setUsername(data.username));
      })
      .catch(error => {
        // Handle error as needed
        console.error(error);
      });
  }, [dispatch]); // Empty array as second argument to useEffect to trigger only on mount


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
        dispatch(setToken(data.token));
        dispatch(setUsername(data.username));
        localStorage.setItem('token', data.token);
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
        dispatch(setToken(data.token));
        dispatch(setUsername(data.username));
        localStorage.setItem('token', data.token);
      })
      .catch(error => {
        // Handle error as needed
        console.error(error);
      });
  };

  return (
    <div>
      {token ? ( // Display welcome message if token exists
        <div style={{ textAlign: 'center' }}>
          <Typography variant="h6" align="center">
            Welcome, {username}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            style={{ marginTop: 10 }}
          >
            Logout
          </Button>
        </div>
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
