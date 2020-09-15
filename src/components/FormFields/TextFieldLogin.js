import React from 'react';
import { TextField } from 'formik-material-ui';
import useStyles from './useStyles';
import { InputAdornment, FormControl } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';

const TextFieldLogin = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { field, form } = props;
  const classes = useStyles();
 
  return(
    <FormControl fullWidth>
      <TextField
        type="email"
        {...props}
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon className={classes.icon}/>
                </InputAdornment>
            )
        }}
      />
    </FormControl>
  )
};

export default TextFieldLogin;