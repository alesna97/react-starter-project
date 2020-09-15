import { makeStyles } from '@material-ui/core';
import React from 'react';
import { Route } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    width: '100%',
    height: '100%'
  }
}));

const NotFound = () => {
  const classes = useStyles();

  return(
    <Route
      render={({ staticContext }) => {
        if (staticContext) {
          staticContext.status = 404; // eslint-disable-line
        }
        return (
          <div className={classes.root}>
           Ooops, sorry page not found :(
          </div>
        );
      }}
    />
  );
}
export default NotFound;
