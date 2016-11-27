import Constants from '~/constants';
import get from '~/helpers/get';

const { Url } = Constants;

const fetchEtiquetas = (opts = {}) => {
  let url = `${Url.API}/etiquetas?page=${opts.page || 1}`;

  url += (typeof opts.offset === 'undefined') ? '' : `&offset=${opts.offset}`;
  url += (typeof opts.sortby === 'undefined') ? '' : `&sortby=${opts.sortby}`;
  url += (typeof opts.direction === 'undefined') ? '' : `&direction=${opts.direction}`;

  return get(url);
};
export default { fetchEtiquetas };
