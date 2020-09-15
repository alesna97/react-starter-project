/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import swal from 'sweetalert2';
import Icon from '../../../components/icon';
import styles from './css';
import LoginForm from './LoginForm';
import authApi from '../../../services/authApi';
import env from '../../../config/env';

const Login = () => {
  const classes = styles();
  const initialValues = { email: '', password: '', grant_type: 'password' };

  const handleSubmit = async (value) => {
    console.log(value);
    setTimeout(() => {
    
      window.location = '/app/dashboard';
    }, 300);
  };

  return (
    <div className={classes.mainContainer}>
      <Grid
        container
        justify="center"
        alignItems="center"
      >
        <Grid item md={3} />
        <Grid item md={6} xs={12} sm={12} className={classes.formContainer}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography component="h1" variant="h4">
                Masuk
              </Typography>
              <LoginForm initialValues={initialValues} onSubmit={handleSubmit} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={3} />
      </Grid>
    </div>
  );
};

export default Login;
