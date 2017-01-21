import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as selectors from '~/store/selectors';

const requireAuth = (ComposedComponent) => {
  const Auth = ({ isAuthorized, ...otherProps }) => (
    isAuthorized ?
      <ComposedComponent {...otherProps} /> :
      <Redirect
        to={{
          pathname: '/login',
          state: {
            redirect: (otherProps.location || {}).pathname === '/login' ?
              ((otherProps.location || {}).state || {}).redirect :
              otherProps.location,
          },
        }}
      />
  );

  Auth.propTypes = {
    isAuthorized: React.PropTypes.bool,
  };

  const mapStateToProps = state => ({
    isAuthorized: selectors.isAuthenticated(state),
  });

  return connect(mapStateToProps)(Auth);
};

export default requireAuth;
