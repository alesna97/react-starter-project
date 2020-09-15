/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import { makeStyles, Box } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const Loader = () => {
  const classes = useStyles();
  return (
    <Box>
      <div className={classes.root}>
        <BeatLoader />
      </div>
    </Box>
  );
};
