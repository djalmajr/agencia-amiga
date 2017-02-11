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
export const notify = createAction('notify', handleNotify);
export const notifyError = createAction('notify', handleNotify);
export const notifyInfo = createAction('notify', handleNotify);
export const notifyWarning = createAction('notify', handleNotify);
export const filter = createAction('filter');
export const updateFilter = createAction('update-filter');
export const updateProfile = createAction('update-profile');
export const updateTabFeed = createAction('update-tab-feed');

// Entity Actions
export const addToOrg = createAction('add-to-org');
export const read = createAction('read');
export const remove = createAction('remove');
export const removeCache = createAction('remove-cache');
export const save = createAction('save', (ref, data) => ({ ref, data }));
export const updateCache = createAction('update-cache');
