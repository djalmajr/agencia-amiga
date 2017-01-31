import _ from 'lodash';

const getData = (attr, notDef) => state => _.get(state.entities, attr, notDef);

export const isFetching = entity => !!getData('isFetching')[entity];
export const isRemoving = (entity, id) => !!(getData('isRemoving')[entity] || {})[id];
export const getEntities = entity => getData('byId')[entity];
export const getEntity = (entity, id) => getEntities(entity)[id];
export const getEntitiesByIds = _.curry((entity, ids, state) =>
  ids.reduce((entities, id) => {
    entities[id] = getEntity(entity, id)(state);
    return entities;
  }, {}),
);
