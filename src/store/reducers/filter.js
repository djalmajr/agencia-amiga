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
export const entity = createFilterReducer('entity', '');
export const isFiltering = handleActions({
  [actions.unauthorize]: () => false,
  [actions.filter]: () => true,
  [actions.searchDone]: () => false,
}, false);
