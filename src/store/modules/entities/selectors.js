// import { createSelector } from 'reselect';
import { merge } from 'lodash';

export const getEntities = (state, entity, id) => {
  const result = merge({}, state.entities.byId[entity]);

  return id ? (result[id] || {}) : result;
};
