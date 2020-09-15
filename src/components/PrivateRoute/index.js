import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, ...props }) => {
  const isLoggedIn = localStorage.getItem('token') ? true : false;
  return (
    <Fragment>
      <Route
        {...props}
        render={
          (props) => (isLoggedIn ? (<Component {...props} />) : (<Redirect to="/login" />))
        }
      />
    </Fragment>
  )
}

PrivateRoute.propTypes = ({
  component: PropTypes.object.isRequired,
});

export default PrivateRoute;