import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const createFilterReducer = (name, defaultValue) => (
  handleActions({
    [actions.unauthorize]: () => defaultValue,
    [actions.updateFilter]: (state, { payload }) =>
      (name === payload.name ? payload.value : state),
  }, defaultValue)
);

export const query = createFilterReducer('query', '');
export const skills = createFilterReducer('skills', []);
export const entity = createFilterReducer('entity', 'users');
export const isFiltering = handleActions({
  [actions.filter]: () => true,
  [actions.unauthorize]: () => false,
  [actions.updateCache]: () => false,
}, false);
