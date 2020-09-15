import React, { useState } from 'react';
import { TextField } from 'formik-material-ui';
import useStyles from './useStyles';
import { InputAdornment, FormControl, IconButton } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const TextFieldPassword = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { field, form } = props;
  const classes = useStyles();
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    form.setFieldValue(prop, event.target.value ? event.target.value : '' );
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  return(
    <FormControl fullWidth>
      <TextField
        onChange={handleChange('password')}
        type={values.showPassword ? 'text' : 'password'}
        value={values.password}
        {...props}
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                  <LockIcon className={classes.icon}/>
                </InputAdornment>
              ),
              
            endAdornment: (
              <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {
                      values.showPassword ? 
                      <Visibility className={classes.icon}/> 
                      : 
                      <VisibilityOff className={classes.icon}/>}
                  </IconButton>
                </InputAdornment>
            )
          }
        }
      />
    </FormControl>
  )
};

export default TextFieldPassword;