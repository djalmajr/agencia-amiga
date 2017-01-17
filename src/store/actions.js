import { createAction } from 'redux-actions';

// App Actions
export const notify = createAction('NOTIFY');
export const search = createAction('SEARCH_REQUEST');
export const searchDone = createAction('SEARCH_DONE');
export const changeSearchFilter = createAction('CHANGE_SEARCH_FILTER');
export const toggleUserMenu = createAction('TOGGLE_USER_MENU');

// Entity Actions

export const getEntities = createAction('GET_ENTITIES');
export const getAllEntities = createAction('GET_ALL_ENTITIES');
export const updateEntitiesCache = createAction('UPDATE_ENTITIES_CACHE');
export const updateEntitiesStatus = createAction('UPDATE_ENTITIES_STATUS');
