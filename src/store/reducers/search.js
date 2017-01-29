import _ from 'lodash';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

export const isSearching = handleActions({
  [actions.unauthorize]: () => false,
  [actions.search]: () => true,
  [actions.searchDone]: () => false,
}, false);

export const appliedFilter = handleActions({
  [actions.unauthorize]: () => ({ filter: 'all' }),
  [actions.applyFilter]: (state, action) => _.assign({}, state, action.payload),
}, ({ filter: 'all' }));

export const selectedFilter = handleActions({
  [actions.unauthorize]: () => ({ filter: 'all' }),
  [actions.updateFilter]: (state, action) => _.assign({}, state, action.payload),
}, ({ filter: 'all' }));

export const searchQuery = handleActions({
  [actions.unauthorize]: () => '',
  [actions.search]: (state, action) => action.payload,
}, '');
