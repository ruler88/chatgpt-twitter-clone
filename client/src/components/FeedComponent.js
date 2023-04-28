import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import API_DOMAIN from '../config';

const useStyles = makeStyles((theme) => ({
    root: {
      margin: theme.spacing(2),
      padding: theme.spacing(2),
      display: 'flex',
      alignItems: 'flex-start',
      backgroundColor: '#F7F9FA', // Set custom background color
    },
    avatar: {
      marginRight: theme.spacing(2),
    },
    username: {
      fontWeight: 'bold',
      alignSelf: 'flex-start', // Set left alignment
    },
    content: {
      flexGrow: 1,
      wordWrap: 'break-word',
    },
    createdAt: {
      marginLeft: 'auto',
      color: theme.palette.text.secondary,
    },
    divider: {
      margin: theme.spacing(2, 0),
    },
  }));


const FeedComponent = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from the /feed endpoint
    fetch(`${API_DOMAIN}/feed`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.posts);
      })
      .catch((error) => console.error('Failed to fetch posts:', error));
  }, []);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Feed
      </Typography>
      {posts.map((post, index) => (
        <React.Fragment key={post._id}>
          <Paper className={classes.root}>
            <Avatar alt={post.username} src={post.avatar} className={classes.avatar} />
            <Typography className={classes.username}>{post.username}</Typography>
            <Typography className={classes.content}>{post.content}</Typography>
            <Typography className={classes.createdAt}>
              {new Date(post.createdAt).toLocaleString()}
            </Typography>
          </Paper>
          {index !== posts.length - 1 && <Divider className={classes.divider} />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default FeedComponent;
