import Constants from '~/constants';
import get from '~/helpers/get';

const { Url } = Constants;

const fetchArtigos = (opts = {}) => {
  let url = opts.query ? `${Url.API}/etiquetas/${opts.query}` : `${Url.API}`;

  url += `/artigos?page=${opts.page || 1}`;
  url += (typeof opts.instancia === 'undefined') ? '' : `&categoria=${opts.instancia}`;
  url += (typeof opts.slug === 'undefined') ? '' : `&slug=${opts.slug}`;
  url += (typeof opts.offset === 'undefined') ? '' : `&offset=${opts.offset}`;
  url += (typeof opts.sortby === 'undefined') ? '' : `&sortby=${opts.sortby}`;
  url += (typeof opts.direction === 'undefined') ? '' : `&direction=${opts.direction}`;
  url += (typeof opts.hasDocumentos === 'undefined') ? '' : `&hasDocumentos=${opts.hasDocumentos}`;

  return get(url);
};

const fetchArtigo = ({ id }) => get(`${Url.API}/artigos/${id}`);

export default { fetchArtigos, fetchArtigo };
