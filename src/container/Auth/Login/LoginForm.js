import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { Button, makeStyles, Checkbox, FormControlLabel, Link, CircularProgress } from '@material-ui/core';

import TextFieldLogin from '../../../components/FormFields/TextFieldLogin';
import TextFieldPassword from '../../../components/FormFields/TextFieldPassword';

const LoginForm = ({ initialValues, onSubmit }) => {
  const classes = useStyles();

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = 'Email tidak boleh kosong !';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Email Tidak Valid !';
    }
    return error;
  };

  const validatePassword = (value) => {
    let error;

    if (!value) {
      error = 'Password tidak boleh kosong !';
    }

    return error;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (value, action) => {
        await onSubmit(value);
      }}
      component={({ submitForm, isSubmitting, errors, touched }) => (
        <Form autoComplete="off" className={classes.container}>
          <div className={classes.form}>
            <Field
              name="email"
              placeholder="Email atau NIK"
              variant="outlined"
              margin="normal"
              autoComplete="off"
              validate={validateEmail}
              fullWidth
              component={TextFieldLogin}
              helperText={touched.email && errors.email}
            />
            <Field
              name="password"
              placeholder="Password"
              variant="outlined"
              margin="normal"
              autoComplete="off"
              validate={validatePassword}
              fullWidth
              component={TextFieldPassword}
              helperText={touched.password && errors.password}
            />
            <div className={classes.buttonContainer}>
              <div className={classes.buttonContainer2}>
                <div className={classes.rememberMe}>
                  <FormControlLabel
                    name="remember"
                    label="Ingat Saya ?"
                    control={
                      <Checkbox value="true" color="primary" />
                    }
                  />
                </div>
                <Link color="primary" href="/lupa-kata-sandi">
                  Lupa kata sandi ?
                </Link>
              </div>
              <Button
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
                variant="contained"
                fullWidth
                style={{ color: 'white', marginTop: 12 }}
              >
                {
                  isSubmitting ? <CircularProgress color="secondary" size={24} /> : 'Masuk'
                }
              </Button>
            </div>
          </div>
        </Form>
      )}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  form: {
    width: '80%',
    [theme.breakpoints.only('xs')]: {
      width: '95%'
    }
  },
  container: {
    display: 'flex',
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
  buttonContainer2: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2)
  },
  rememberMe: {
    flex: 1,
  },
}));

LoginForm.propTypes = ({
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
});

export default LoginForm;
