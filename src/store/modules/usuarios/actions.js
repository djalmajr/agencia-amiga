import { createAction } from 'redux-actions';

// Auth
export const login = createAction('LOGIN');
export const logout = createAction('LOGOUT');
export const authorize = createAction('AUTHORIZE');
export const unauthorize = createAction('UNAUTHORIZE');
export const loginWithCertificate = createAction('LOGIN_WITH_CERTIFICATE');
export const recoverPassword = createAction('RECOVER_PASSWORD');

// App State
export const notify = createAction('NOTIFY');
export const filterMainMenu = createAction('FILTER_MAIN_MENU');
export const toggleMainMenu = createAction('TOGGLE_MAIN_MENU');
export const toggleUserMenu = createAction('TOGGLE_USER_MENU');
