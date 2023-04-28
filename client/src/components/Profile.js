import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import FeedComponent from './FeedComponent';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
bottomComponent: {
    textAlign: 'center',
    minHeight: '100vh',
    border: '1px solid #000',
    padding: theme.spacing(2),
},
}));

const Profile = () => {
  const { username } = useParams();



  const classes = useStyles();

  return (
    <div>
      <h1>{username}'s Profile</h1>
      <Container className={classes.bottomComponent}>
        <div>
            <FeedComponent username={username}/>
        </div>
        </Container>
    </div>
  );
};

export default Profile;
