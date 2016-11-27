import { merge, values } from 'lodash';

export const getAllEtiquetas = state =>
  values(state.etiquetas.byId);

export const isFetchingEtiquetas = state =>
  state.etiquetas.isFetching;

export const getFilterEtiqueta = state =>
  merge({}, state.etiquetas.filter);
