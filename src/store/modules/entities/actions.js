import { createAction } from 'redux-actions';

export const getEntities = createAction('GET_ENTITIES');
export const getAllEntities = createAction('GET_ALL_ENTITIES');
export const updateEntitiesCache = createAction('UPDATE_ENTITIES_CACHE');
export const updateEntitiesStatus = createAction('UPDATE_ENTITIES_STATUS');
