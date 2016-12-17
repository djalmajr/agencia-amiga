import { keys, merge } from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

export default combineReducers({
  byId: handleActions({
    UNAUTHORIZE: () => ({}),
    UPDATE_ENTITIES_CACHE: (state, { error, payload }) => {
      if (error) {
        return state;
      }

      return merge({}, state, { [payload.entity]: payload.response });
    },
  }, {}),

  isFetching: handleActions({
    UNAUTHORIZE: () => ({}),
    UPDATE_ENTITIES_STATUS: (state, { error, payload }) => merge({}, state, {
      [payload.entity]: error ? false : payload.status,
    }),
  }, {}),

  visibleIds: handleActions({
    UNAUTHORIZE: () => ({}),
    UPDATE_ENTITIES_CACHE: (state, { error, payload }) => {
      if (error) {
        return state;
      }

      return merge({}, state, { [payload.entity]: keys(payload.response) });
    },
  }, {}),
});
