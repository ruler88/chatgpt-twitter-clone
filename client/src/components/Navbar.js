import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#2196f3', // Set custom background color
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
    const classes = useStyles();

    return (
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Link to="/" className={classes.title}>
            <Button
              color="inherit"
              style={{ color: 'white', border: '1px solid white' }}
            >
              Home
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    );
  };


export default Navbar;
