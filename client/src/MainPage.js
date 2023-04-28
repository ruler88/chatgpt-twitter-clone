import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  topLeftComponent: {
    textAlign: 'left',
    height: '20vh',
    border: '1px solid #000',
    padding: theme.spacing(2),
  },
  topRightComponent: {
    textAlign: 'right',
    height: '20vh',
    border: '1px solid #000',
    padding: theme.spacing(2),
  },
  bottomComponent: {
    textAlign: 'center',
    height: '100vh',
    border: '1px solid #000',
    padding: theme.spacing(2),
  },
}));

const MainPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Container className={classes.topLeftComponent}>
            <div>
              Login
            </div>
          </Container>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Container className={classes.topRightComponent}>
            <div>
              Write Tweet
            </div>
          </Container>
        </Grid>
        <Grid item xs={12}>
          <Container className={classes.bottomComponent}>
            <div>
              Feed
            </div>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainPage;
