import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import API_DOMAIN from '../config'; // Import API_DOMAIN from config.js


const WriteTweet = () => {
  const [tweetText, setTweetText] = useState('');
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);
  const username = useSelector(state => state.user.username);

  const handleInputChange = (event) => {
    setTweetText(event.target.value);
  };

  const handleTweetSubmit = () => {
    if (!token) {
      console.log('Please login/register to make a Tweet');
      return;
    }

    // Add logic to submit tweet to API with tweetText using fetch
    fetch(`${API_DOMAIN}/createPost`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ content: tweetText, username })
    })
      .then(response => {
        console.log(response);
        if (!response.ok) {
          throw new Error('Failed to submit tweet');
        }
        console.log('Tweet submitted:', tweetText);
        // Clear tweet text after successful submission
        setTweetText('');
      })
      .catch(error => {
        console.error('Failed to submit tweet:', error);
      });
  };

  if (!token) {
    return (
      <div>
        <Typography variant="h6">Please login/register to write a Tweet</Typography>
      </div>
    );
  }

  return (
    <div>
      <TextField
        label="Tweet Text"
        multiline
        rows={5}
        variant="outlined"
        value={tweetText}
        onChange={handleInputChange}
        fullWidth
      />
      <br />
      <Button variant="contained" color="primary" onClick={handleTweetSubmit} style={{ marginTop: '10px' }}>
        Submit
      </Button>
    </div>
  );
};

export default WriteTweet;
