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
export const authorize = createAction('authorize');
export const unauthorize = createAction('unauthorize');

// App Actions
export const notify = createAction('notify', handleNotify);
export const notifyError = createAction('notify', handleNotify);
export const search = createAction('search-request');
export const searchDone = createAction('search-done');
export const changeSearchFilter = createAction('change-search-filter');
export const toggleUserMenu = createAction('toggle-user-menu');

// Entity Actions
export const getEntities = createAction('get-entities');
export const getAllEntities = createAction('get-all-entities');
export const updateEntitiesCache = createAction('update-entities-cache');
export const updateEntitiesStatus = createAction('update-entities-status');
