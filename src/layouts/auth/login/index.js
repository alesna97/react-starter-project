/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import styles from "./css";
import Icon from "../../../components/icon";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import swal from 'sweetalert2';
import LoginForm from "./LoginForm";
import authApi from "../../../services/authApi";
import env from "../../../config/env";

const Login = () => {
  const classes = styles();
  const initialValues = { email: '', password: '', grant_type: 'password'};

  const handleSubmit = async (value) => {
    try {
      const { status, data } = await authApi.post(`${env.authApi}/oauth/token?scope=read write`, value)

      if (status === 200) {
        const { access_token, refresh_token, user } = data;
        localStorage.setItem('token', access_token);
        localStorage.setItem('refresh', refresh_token);
        localStorage.setItem('user', JSON.stringify(user));
        window.location = '/app/dashboard';
      }
    } catch (error) {
      if (error.response.data) {
        swal.fire({
          title: 'Terjadi Kesalahan !',
          icon: 'error',
          text: error.response.data.message
        });
      } else {
        swal.fire({
          title: 'Maaf, terjadi kesalahan sistem',
          icon: 'error'
        })
      }
    }
  };

return (
    <div className={classes.mainContainer}>
      <Grid
        container
        justify="center"
        alignItems="center"
      >
        <Grid item md={3}></Grid>
        <Grid item md={6} xs={12} sm={12} className={classes.formContainer}>
          <Card className={classes.card}> 
            <CardContent className={classes.cardContent}>
              <img src={Icon.logo} className={classes.img} alt="logo"/>
              <Typography component="h1" variant="h4">
                  Masuk
              </Typography>
              <LoginForm initialValues={initialValues} onSubmit={handleSubmit}/>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={3}></Grid>
      </Grid>
    </div>
  );
};

export default Login;