import { createAction } from 'redux-actions';

export const clear = createAction('ARTIGOS_CLEAR_RESULTS');
export const updateCache = createAction('ARTIGOS_UPDATE_CACHE');

export const fetchArtigo = createAction(
  'ARTIGO_FETCH',
  id => ({ instancia: 'noticias', id }),
);

export const fetchArtigos = createAction(
  'ARTIGOS_FETCH',
  opts => ({
    ...opts,
    offset: 20,
    instancia: 'noticias',
    sortBy: 'dataCadastro',
    direction: 'DESC',
  }),
);

export const updateStatus = createAction(
  'ARTIGOS_UPDATE_STATUS',
  (instancia, status) => ({ instancia, status }),
);
