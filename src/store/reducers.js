import { combineReducers } from 'redux';
import { assign, keys, merge } from 'lodash';
import { handleActions } from 'redux-actions';
import * as actions from './actions';

const application = combineReducers({
  /**
   * Mantém os dados do usuário.
   */
  userData: handleActions({
    [actions.unauthorize]: () => ({}),
    [actions.authorize]: (state, action) => {
      if (action.error) {
        return state;
      }

      return merge({}, action.payload.message);
    },
  }, {}),

  /**
   * Indica se o login está sendo realizado.
   */
  isAuthenticating: handleActions({
    [actions.login]: () => true,
    [actions.logout]: () => true,
    [actions.authorize]: () => false,
    [actions.unauthorize]: () => false,
  }, false),

  /**
   * Notificação Global.
   */
  notification: handleActions({
    [actions.notify]: (state, action) => merge({ position: 'br', level: 'success' }, action.payload),
    [actions.notifyError]: (state, action) => merge({ position: 'br', level: 'error' }, action.payload),
  }, {}),

  /**
   * Filtro que será aplicado na busca.
   */
  searchFilter: handleActions({
    [actions.unauthorize]: () => ({ filter: 'all' }),
    [actions.changeSearchFilter]: (state, action) => assign({}, state, action.payload),
  }, ({ filter: 'all' })),

  /**
   * Termo a ser buscado.
   */
  searchQuery: handleActions({
    [actions.unauthorize]: () => '',
    [actions.search]: (state, action) => action.payload,
  }, ''),

  /**
   * .
   */
  isSearching: handleActions({
    [actions.unauthorize]: () => false,
    [actions.search]: () => true,
    [actions.searchDone]: () => false,
  }, false),

  /**
   * Atualiza o estado do menu do usuário (menu do topo).
   */
  isUserMenuVisible: handleActions({
    [actions.unauthorize]: () => false,
    [actions.toggleUserMenu]: state => !state,
  }, false),
});

const entities = combineReducers({
  byId: handleActions({
    [actions.unauthorize]: () => ({}),
    [actions.updateEntitiesCache]: (state, { error, payload }) => {
      if (error) {
        return state;
      }

      return merge({}, state, { [payload.entity]: payload.response });
    },
  }, {}),

  isFetching: handleActions({
    [actions.unauthorize]: () => ({}),
    [actions.updateEntitiesStatus]: (state, { error, payload }) => merge({}, state, {
      [payload.entity]: error ? false : payload.status,
    }),
  }, {}),

  visibleIds: handleActions({
    [actions.unauthorize]: () => ({}),
    [actions.updateEntitiesCache]: (state, { error, payload }) => {
      if (error) {
        return state;
      }

      return merge({}, state, { [payload.entity]: keys(payload.response) });
    },
  }, {}),
});

export default combineReducers({ application, entities });
