import _ from 'lodash';

export const isFetching = (state, entity) =>
  !!state.entities.isFetching[entity];

export const isRemoving = (state, entity, id) =>
  !!(state.entities.isRemoving[entity] || {})[id];

export const getEntities = (state, entity, id) => {
  const result = _.merge({}, state.entities.byId[entity]);

  return typeof id !== 'undefined' ? (result[id] || {}) : result;
};

export const getToRemove = (state, entity, id) => {
  const result = _.merge({}, state.entities.toRemove[entity]);

  return typeof id !== 'undefined' ? (result[id] || {}) : result;
};
