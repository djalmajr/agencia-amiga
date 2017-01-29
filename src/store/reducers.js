import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { innerReducer as asyncState } from 'redux-async-initial-state';
import * as actions from './actions';

const application = combineReducers({
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

  isSearching: handleActions({
    [actions.unauthorize]: () => false,
    [actions.search]: () => true,
    [actions.searchDone]: () => false,
  }, false),

  isUpdatingProfile: handleActions({
    [actions.unauthorize]: () => false,
    [actions.updateProfileStatus]: (state, action) => action.payload,
  }, false),

  isUserMenuVisible: handleActions({
    [actions.unauthorize]: () => false,
    [actions.toggleUserMenu]: state => !state,
  }, false),

  notification: handleActions({
    [actions.notify]: (state, action) => _.merge({ position: 'br', level: 'success' }, action.payload),
    [actions.notifyError]: (state, action) => _.merge({ position: 'br', level: 'error' }, action.payload),
    [actions.notifyInfo]: (state, action) => _.merge({ position: 'br', level: 'info' }, action.payload),
    [actions.notifyWarning]: (state, action) => _.merge({ position: 'br', level: 'warning' }, action.payload),
  }, {}),

  appliedFilter: handleActions({
    [actions.unauthorize]: () => ({ filter: 'all' }),
    [actions.applyFilter]: (state, action) => _.assign({}, state, action.payload),
  }, ({ filter: 'all' })),

  selectedFilter: handleActions({
    [actions.unauthorize]: () => ({ filter: 'all' }),
    [actions.updateFilter]: (state, action) => _.assign({}, state, action.payload),
  }, ({ filter: 'all' })),

  searchQuery: handleActions({
    [actions.unauthorize]: () => '',
    [actions.search]: (state, action) => action.payload,
  }, ''),

  authData: handleActions({
    [actions.unauthorize]: () => ({}),
    [actions.authorize]: (state, { error, payload }) => {
      if (error) {
        return state;
      }

      return _.merge({}, state, payload);
    },
  }, {}),

  userData: handleActions({
    [actions.unauthorize]: () => ({}),
    [actions.updateCache]: (state, { error, payload }) => {
      if (error || payload.entity !== 'users') {
        return state;
      }

      return _.merge({}, state, _.values(payload.response)[0]);
    },
  }, {}),
});

const entities = combineReducers({
  byId: handleActions({
    [actions.unauthorize]: () => ({}),
    [actions.updateCache]: (state, { error, payload }) => {
      if (error) {
        return state;
      }

      return _.merge({}, state, { [payload.entity]: payload.response });
    },
  }, {}),

  isFetching: handleActions({
    [actions.unauthorize]: () => ({}),
    [actions.updateStatus]: (state, { payload }) => _.merge({}, state, {
      [payload.entity]: payload.status,
    }),
  }, {}),

  visibleIds: handleActions({
    [actions.unauthorize]: () => ({}),
    [actions.updateCache]: (state, { error, payload }) => {
      if (error) {
        return state;
      }

      return _.merge({}, state, { [payload.entity]: _.keys(payload.response) });
    },
  }, {}),
});

export default combineReducers({ asyncState, application, entities });
