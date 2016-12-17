import { once } from '~/helpers/fbase';

export const getEntities = ({ id, entity }) =>
  once(id ? `${entity}/${id}` : entity);
