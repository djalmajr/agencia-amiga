import _ from 'lodash';
import { createSelector } from 'reselect';
import createGetData from '~/helpers/create-get-data';
import { getEntitiesByIds } from './entities';

const getData = createGetData('auth');

export const getAuth = getData('authData');

export const getUser = createSelector(
  getAuth,
  state => getEntitiesByIds('users', _, state),
  (auth, fnGetUser) => fnGetUser([auth.uid])[auth.uid],
);

export const isRegistering = getData('isRegistering');
export const isAuthenticating = getData('isAuthenticating');
export const isAuthenticated = createSelector(getAuth, auth => !_.isEmpty(auth));
