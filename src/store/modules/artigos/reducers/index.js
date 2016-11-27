import { uniq, merge } from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { normalize } from 'normalizr';
import Schemas from '~/store/schemas';

const isFetching = handleActions({
  ARTIGOS_UPDATE_STATUS: (state, action) => {
    const { instancia, status } = action.payload;

    if (!instancia) {
      throw new Error('O atributo instancia é obrigatório');
    }

    return merge({}, state, { [instancia]: status });
  },
}, {});

const byId = handleActions({
  ARTIGOS_UPDATE_CACHE: (state, action) => {
    if (action.error) {
      return state;
    }

    const { entities } = normalize(action.payload.response, Schemas.artigos);
    const artigos = entities[Schemas.artigo.getKey()];

    return merge({}, state, artigos);
  },
}, {});

const currentPage = handleActions({
  ARTIGOS_FETCH: (state, action) => {
    if (action.payload.page) {
      return action.payload.page;
    }

    return state;
  },
  ARTIGOS_CLEAR_RESULTS: () => 0,
  ARTIGOS_UPDATE_CACHE: (state, action) => {
    if (action.error) {
      return state;
    }

    return action.payload.currentPage;
  },
}, 0);

const totalPages = handleActions({
  ARTIGOS_CLEAR_RESULTS: () => -1,
  ARTIGOS_UPDATE_CACHE: (state, action) => {
    if (action.error) {
      return state;
    }

    return action.payload.totalPages;
  },
}, -1);

const visibleIds = handleActions({
  ARTIGOS_CLEAR_RESULTS: () => [],
  ARTIGOS_UPDATE_CACHE: (state, action) => {
    if (action.error) {
      return state;
    }

    const { result } = normalize(action.payload.response, Schemas.artigos);

    return uniq(state.concat(result));
  },
}, []);

export default combineReducers({
  byId,
  isFetching,
  currentPage,
  totalPages,
  visibleIds,
});
