import { v4 } from 'uuid';
import { createAction as createReduxActions } from 'redux-actions';

const createAction = (name, ...args) => createReduxActions(`${name}-${v4()}`, ...args);

const handleNotify = (message) => {
  message = typeof message === 'string' ? { message } : message;
  message.uid = v4();

  return message;
};

// Auth
export const login = createAction('login');
export const logout = createAction('logout');
export const register = createAction('register');
export const authorize = createAction('authorize');
export const unauthorize = createAction('unauthorize');

// App Actions
export const notify = createAction('notify', handleNotify);
export const notifyError = createAction('notify', handleNotify);
export const notifyInfo = createAction('notify', handleNotify);
export const notifyWarning = createAction('notify', handleNotify);
export const search = createAction('search-request');
export const searchDone = createAction('search-done');
export const changeSearchFilter = createAction('change-search-filter');
export const toggleUserMenu = createAction('toggle-user-menu');
export const updateProfile = createAction('update-profile');
export const updateProfileStatus = createAction('update-profile-status');
export const updateUserCache = createAction('update-user-cache');

// Entity Actions
export const addToOrg = createAction('add-to-org');
export const read = createAction('read');
export const readAll = createAction('read-all');
export const save = createAction('save', (ref, data) => ({ ref, data }));
export const saveAll = createAction('save-all');
export const updateCache = createAction('update-cache');
export const updateStatus = createAction('update-status');
