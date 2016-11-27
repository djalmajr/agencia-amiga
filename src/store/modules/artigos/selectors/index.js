import { merge, values } from 'lodash';
import { createSelector } from 'reselect';
import { getFilterEtiqueta } from '~/store/modules/etiquetas/selectors';

export const getAllArtigosMap = state =>
  merge({}, state.artigos.byId);

export const getAllArtigos = createSelector(
  state => [].concat(state.artigos.visibleIds),
  state => getAllArtigosMap(state),
  state => getFilterEtiqueta(state),
  (ids, byId, filter) => {
    const artigos = ids.map(id => byId[id]);

    if (filter.id) {
      return artigos.filter(artigo =>
        artigo.siteEtiquetas.indexOf(filter.id) !== -1,
      );
    }

    return artigos;
  },
);

export const isFetchingArtigos = state =>
  !!values(state.artigos.isFetching)[0];
