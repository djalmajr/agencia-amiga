import _ from 'lodash';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const emptyObject = {};

export const notification = handleActions({
  [actions.notify]: (state, action) => _.merge({ position: 'br', level: 'success' }, action.payload),
  [actions.notifyError]: (state, action) => _.merge({ position: 'br', level: 'error' }, action.payload),
  [actions.notifyInfo]: (state, action) => _.merge({ position: 'br', level: 'info' }, action.payload),
  [actions.notifyWarning]: (state, action) => _.merge({ position: 'br', level: 'warning' }, action.payload),
}, emptyObject);
