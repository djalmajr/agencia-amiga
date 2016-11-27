import { Schema, arrayOf } from 'normalizr';

const etiqueta = new Schema('SiteEtiqueta');
const categoria = new Schema('SiteCategoria');
const documento = new Schema('Documento');
const secao = new Schema('SiteSecao');
const artigo = new Schema('SiteArtigo', {
  defaults: {
    siteEtiquetas: [],
  },
});

categoria.define({
  subCategorias: arrayOf(categoria),
});

secao.define({
  siteCategorias: arrayOf(categoria),
});

artigo.define({
  documentoDocumentoPrincipal: documento,
  documentos: arrayOf(documento),
  siteCategoria: categoria,
  siteCategoriaRelacionadas: arrayOf(categoria),
  siteEtiquetas: arrayOf(etiqueta),
});

etiqueta.define({
  siteArtigos: arrayOf(artigo),
});

export default {
  artigo,
  categoria,
  documento,
  etiqueta,
  secao,
  artigos: arrayOf(artigo),
  categorias: arrayOf(categoria),
  documentos: arrayOf(documento),
  etiquetas: arrayOf(etiqueta),
  secoes: arrayOf(secao),
};
