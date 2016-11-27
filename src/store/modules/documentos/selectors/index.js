import { merge, values } from 'lodash';
import { createSelector } from 'reselect';
import { getAllArtigos } from '~/store/modules/artigos/selectors';

const mergeArtigos = createSelector(
  state => getAllArtigos(state),
  state => state.documentos.byId,
  (artigos, documentosById) => {
    const documentos = merge({}, documentosById);

    Object.keys(documentos).forEach((id) => {
      documentos[id].idSiteArtigo = (artigos.find(artigo =>
        artigo.idDocumentoDocumentoPrincipal === documentos[id].id ||
        artigo.documentos.find(idDoc => idDoc === documentos[id].id),
      ) || {}).id;
    });

    return documentos;
  },
);

export const getAllDocumentosById = state => mergeArtigos(state);
export const getAllDocumentos = state => values(mergeArtigos(state));
export const isFetchingDocumentos = state => state.documentos.isFetching;

