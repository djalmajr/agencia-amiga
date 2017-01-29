import { v4 } from 'uuid';
import createAction from '~/helpers/create-action';

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
export const applyFilter = createAction('apply-filter');
export const notify = createAction('notify', handleNotify);
export const notifyError = createAction('notify', handleNotify);
export const notifyInfo = createAction('notify', handleNotify);
export const notifyWarning = createAction('notify', handleNotify);
export const search = createAction('search-request');
export const searchDone = createAction('search-done');
export const toggleUserMenu = createAction('toggle-user-menu');
export const updateFilter = createAction('update-filter');
export const updateProfile = createAction('update-profile');
export const updateProfileStatus = createAction('update-profile-status');
export const updateTabFeed = createAction('update-tab-feed');

// Entity Actions
export const addToOrg = createAction('add-to-org');
export const read = createAction('read');
export const readAll = createAction('read-all');
export const save = createAction('save', (ref, data) => ({ ref, data }));
export const saveAll = createAction('save-all');
export const updateCache = createAction('update-cache');
export const updateStatus = createAction('update-status');
