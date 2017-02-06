import _ from 'lodash';
import emptyObject from 'fbjs/lib/emptyObject';
import createGetData from '~/helpers/create-get-data';

const getData = createGetData('entities');

export const isFetching = entity => !!getData('isFetching')[entity];
export const isRemoving = (entity, id) => !!(getData('isRemoving')[entity] || emptyObject)[id];
export const getEntities = entity => getData('byId')[entity];
export const getEntity = (entity, id) => getEntities(entity)[id];
export const getEntitiesByIds = _.curry((entity, ids, state) =>
  ids.reduce((entities, id) => {
    entities[id] = getEntity(entity, id)(state);
    return entities;
  }, emptyObject),
);
