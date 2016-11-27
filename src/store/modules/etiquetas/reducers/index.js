import { merge } from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { normalize } from 'normalizr';
import Schemas from '~/store/schemas';

const isFetching = handleActions({
  ETIQUETAS_UPDATE_STATUS: (state, action) => action.payload,
}, false);

const filter = handleActions({
  ETIQUETAS_CLEAR_FILTER: () => ({}),
  ETIQUETAS_SET_FILTER: (state, action) => action.payload,
}, {});

const byId = handleActions({
  ARTIGOS_UPDATE_CACHE: (state, action) => {
    if (!action.error) {
      const { entities } = normalize(action.payload.response, Schemas.artigos);
      const etiquetas = entities[Schemas.etiqueta.getKey()];

      return merge({}, state, etiquetas);
    }

    return state;
  },
  ETIQUETAS_UPDATE_CACHE: (state, action) => {
    if (!action.error) {
      const { entities } = normalize(action.payload.response, Schemas.etiquetas);
      const etiquetas = entities[Schemas.etiqueta.getKey()];

      return merge({}, state, etiquetas);
    }

    return state;
  },
}, {});

export default combineReducers({
  byId,
  isFetching,
  filter,
});
