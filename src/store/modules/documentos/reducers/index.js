import { merge } from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { normalize } from 'normalizr';
import Schemas from '~/store/schemas';

const byId = handleActions({
  ARTIGOS_UPDATE_CACHE: (state, action) => {
    if (!action.error) {
      const { entities } = normalize(action.payload.response, Schemas.artigos);
      const documentos = entities[Schemas.documento.getKey()];

      return merge({}, state, documentos);
    }

    return state;
  },
}, {});

const isFetching = handleActions({
  ARTIGOS_UPDATE_STATUS: (state, action) => action.payload.status,
}, false);

export default combineReducers({
  byId,
  isFetching,
});
