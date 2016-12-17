import { merge } from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

export default combineReducers({
  /**
   * Mantém os dados do usuário.
   */
  userData: handleActions({
    UNAUTHORIZE: () => ({}),
    AUTHORIZE: (state, action) => {
      if (action.error) {
        return state;
      }

      return merge({}, action.payload.message);
    },
  }, {}),

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

  mainMenuQuery: handleActions({
    UNAUTHORIZE: () => '',
    FILTER_MAIN_MENU: (state, action) => action.payload,
  }, ''),

  menuGroups: handleActions({
    UNAUTHORIZE: () => [],
  }, []),

  /**
   * Indica se o login está sendo realizado.
   */
  isAuthenticating: handleActions({
    LOGIN: () => true,
    LOGOUT: () => true,
    AUTHORIZE: () => false,
    UNAUTHORIZE: () => false,
  }, false),

  /**
   * Atualiza o estado do menu principal (painel lateral).
   */
  isMainMenuVisible: handleActions({
    UNAUTHORIZE: () => false,
    TOGGLE_MAIN_MENU: state => !state,
  }, false),

  /**
   * Atualiza o estado do menu do usuário (menu do topo).
   */
  isUserMenuVisible: handleActions({
    UNAUTHORIZE: () => false,
    TOGGLE_USER_MENU: state => !state,
  }, false),
});
