import _ from 'lodash';

export const isFetching = (state, entity) =>
  state.entities.isFetching[entity];

export const getEntities = (state, entity, id) => {
  const result = _.merge({}, state.entities.byId[entity]);

  return typeof id !== 'undefined' ? (result[id] || {}) : result;
};
