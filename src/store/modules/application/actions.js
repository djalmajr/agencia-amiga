import { createAction } from 'redux-actions';

export const notify = createAction('NOTIFY');
export const search = createAction('SEARCH_REQUEST');
export const searchDone = createAction('SEARCH_DONE');
export const changeSearchFilter = createAction('CHANGE_SEARCH_FILTER');
export const toggleUserMenu = createAction('TOGGLE_USER_MENU');
