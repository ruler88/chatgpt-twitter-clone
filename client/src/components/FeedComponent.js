import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
    textDecoration: 'underline', // Add underline to text
    cursor: 'pointer', // Add pointer cursor on hover
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

const FeedComponent = ({ username }) => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Construct the URL to fetch the posts
    const url = `${API_DOMAIN}/feed${username ? `?username=${username}` : ''}`;

    // Fetch posts from the endpoint
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.posts);
      })
      .catch((error) => console.error('Failed to fetch posts:', error));
  }, [username]);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Feed
      </Typography>
      {posts.map((post, index) => (
        <React.Fragment key={post._id}>
          <Paper className={classes.root}>
            <Avatar alt={post.username} src={post.avatar} className={classes.avatar} />
            <Link to={`/profile/${post.username}`} className={classes.username} style={{color: '#1DA1F2', textDecoration: 'none'}}>
              <Typography>{post.username}</Typography>
            </Link>
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
