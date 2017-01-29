import _ from 'lodash';

export const getAuthData = state => state.auth.authData;
export const getUserData = state => state.auth.userData;

export const isAuthenticated = state => !_.isEmpty(state.auth.userData);
export const isAuthenticating = state => state.auth.isAuthenticating;
export const isRegistering = state => state.auth.isRegistering;
