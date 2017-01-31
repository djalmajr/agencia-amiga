import _ from 'lodash';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const initialFilter = {
  query: '',
  type: 'all',
};

export const isSearching = handleActions({
  [actions.unauthorize]: () => false,
  [actions.search]: () => true,
  [actions.searchDone]: () => false,
}, false);

export const filter = handleActions({
  [actions.unauthorize]: () => initialFilter,
  [actions.updateFilter]: (state, action) => _.assign({}, state, action.payload),
}, initialFilter);
