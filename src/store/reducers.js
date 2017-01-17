import { combineReducers } from 'redux';
import { assign, keys, merge } from 'lodash';
import { handleActions } from 'redux-actions';

const application = combineReducers({
  /**
   * Notificação Global.
   */
  notification: handleActions({
    UNAUTHORIZE: () => ({}),
    NOTIFY: (state, action) => {
      if ((action.payload || {}).message) {
        return merge({}, action.payload);
      }

      return {};
    },
  }, {}),

  /**
   * Filtro que será aplicado na busca.
   */
  searchFilter: handleActions({
    UNAUTHORIZE: () => ({ filter: 'all' }),
    CHANGE_SEARCH_FILTER: (state, action) => assign({}, state, action.payload),
  }, ({ filter: 'all' })),

  /**
   * Termo a ser buscado.
   */
  searchQuery: handleActions({
    UNAUTHORIZE: () => '',
    SEARCH_REQUEST: (state, action) => action.payload,
  }, ''),

  /**
   * .
   */
  isSearching: handleActions({
    UNAUTHORIZE: () => false,
    SEARCH_REQUEST: () => true,
    SEARCH_DONE: () => false,
  }, false),

  /**
   * Atualiza o estado do menu do usuário (menu do topo).
   */
  isUserMenuVisible: handleActions({
    UNAUTHORIZE: () => false,
    TOGGLE_USER_MENU: state => !state,
  }, false),
});

const entities = combineReducers({
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

export default combineReducers({ application, entities });
