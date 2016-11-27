import { createAction } from 'redux-actions';

export const fetch = createAction('ETIQUETAS_FETCH');
export const clearFilter = createAction('ETIQUETAS_CLEAR_FILTER');
export const setFilter = createAction('ETIQUETAS_SET_FILTER');
export const updateCache = createAction('ETIQUETAS_UPDATE_CACHE');
export const updateStatus = createAction('ETIQUETAS_UPDATE_STATUS');
