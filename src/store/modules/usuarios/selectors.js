import { createSelector } from 'reselect';
import { concat, isEmpty, merge } from 'lodash';
// import { AgenteSchema, DocumentoSchema } from '@audora/schemas';

export const isAuthenticated = state => !isEmpty(state.core.userData);
export const isAuthenticating = state => state.core.isAuthenticating;
export const getMainMenuFetchStatus = () => false;
export const getMainMenuVisibility = state => state.core.isMainMenuVisible;
export const getUserMenuVisibility = state => state.core.isUserMenuVisible;
export const getNotification = state => merge({}, state.core.notification);
export const getMainMenuQuery = state => state.core.mainMenuQuery;

export const getMenuGroups = createSelector(
  state => getMainMenuQuery(state),
  state => concat([], state.core.menuGroups),
  (query, menuGroups) => menuGroups,
);

export const getAgenteLogado = (state) => {
  const agenteLogado = merge({}, state.core.userData);

  return !isEmpty(agenteLogado) ? agenteLogado : {
    descricao: '',
    documentoFoto: '',
  };
};
