// import { createSelector } from 'reselect';
import { merge } from 'lodash';

export const getEntities = (state, entity) =>
  merge({}, state.entities.byId[entity]);
