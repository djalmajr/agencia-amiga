// import { createSelector } from 'reselect';
import { merge } from 'lodash';

export const getEntitites = (state, entity) =>
  merge({}, state.entities.byId[entity]);
