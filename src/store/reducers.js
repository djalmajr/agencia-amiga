import { combineReducers } from 'redux';
import { assign, keys, merge } from 'lodash';
import { handleActions } from 'redux-actions';
import { innerReducer as asyncState } from 'redux-async-initial-state';
import * as actions from './actions';

const application = combineReducers({
  userData: handleActions({
    [actions.unauthorize]: () => ({}),
    [actions.authorize]: (state, action) => {
      if (action.error) {
        return state;
      }

      return merge({}, action.payload);
    },
  }, {}),

  isAuthenticating: handleActions({
    [actions.login]: () => true,
    [actions.logout]: () => true,
    [actions.authorize]: () => false,
    [actions.unauthorize]: () => false,
  }, false),

  isRegistering: handleActions({
    [actions.register]: () => true,
    [actions.authorize]: () => false,
    [actions.unauthorize]: () => false,
  }, false),

  notification: handleActions({
    [actions.notify]: (state, action) => merge({ position: 'br', level: 'success' }, action.payload),
    [actions.notifyError]: (state, action) => merge({ position: 'br', level: 'error' }, action.payload),
  }, {}),

  searchFilter: handleActions({
    [actions.unauthorize]: () => ({ filter: 'all' }),
    [actions.changeSearchFilter]: (state, action) => assign({}, state, action.payload),
  }, ({ filter: 'all' })),

  searchQuery: handleActions({
    [actions.unauthorize]: () => '',
    [actions.search]: (state, action) => action.payload,
  }, ''),

  isSearching: handleActions({
    [actions.unauthorize]: () => false,
    [actions.search]: () => true,
    [actions.searchDone]: () => false,
  }, false),

  isUserMenuVisible: handleActions({
    [actions.unauthorize]: () => false,
    [actions.toggleUserMenu]: state => !state,
  }, false),
});

const entities = combineReducers({
  byId: handleActions({
    [actions.unauthorize]: () => ({}),
    [actions.updateCache]: (state, { error, payload }) => {
      if (error) {
        return state;
      }

      return merge({}, state, { [payload.entity]: payload.response });
    },
  }, {}),

  isFetching: handleActions({
    [actions.unauthorize]: () => ({}),
    [actions.updateStatus]: (state, { error, payload }) => merge({}, state, {
      [payload.entity]: error ? false : payload.status,
    }),
  }, {}),

  visibleIds: handleActions({
    [actions.unauthorize]: () => ({}),
    [actions.updateCache]: (state, { error, payload }) => {
      if (error) {
        return state;
      }

      return merge({}, state, { [payload.entity]: keys(payload.response) });
    },
  }, {}),
});

export default combineReducers({ asyncState, application, entities });
