import _ from 'lodash';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

export const isUpdatingProfile = handleActions({
  [actions.unauthorize]: () => false,
  [actions.updateProfileStatus]: (state, action) => action.payload,
}, false);

export const isUserMenuVisible = handleActions({
  [actions.unauthorize]: () => false,
  [actions.toggleUserMenu]: state => !state,
}, false);

export const notification = handleActions({
  [actions.notify]: (state, action) => _.merge({ position: 'br', level: 'success' }, action.payload),
  [actions.notifyError]: (state, action) => _.merge({ position: 'br', level: 'error' }, action.payload),
  [actions.notifyInfo]: (state, action) => _.merge({ position: 'br', level: 'info' }, action.payload),
  [actions.notifyWarning]: (state, action) => _.merge({ position: 'br', level: 'warning' }, action.payload),
}, {});

export const currentTabFeed = handleActions({
  [actions.unauthorize]: () => 'timeline',
  [actions.updateTabFeed]: (state, { payload }) => payload,
}, 'timeline');
