import _ from 'lodash';
import latinize from 'latinize';
import { createSelector } from 'reselect';
// import { Filter } from '~/constants';
import createGetData from '~/helpers/create-get-data';

const _getData = createGetData('filter');

const types = {
  users: 'volunteer',
  organizations: 'organization',
};

const format = data => ({
  uid: data.uid,
  title: data.name,
  meta: data.email,
  image: data.image,
  description: data.resume || data.details || data.description || '',
  createdAt: data.createdAt,
  udpateAt: data.udpateAt,
});

export const isFiltering = _getData('isFiltering');
export const getQueryFilter = _getData('query');
export const getEntityFilter = _getData('entity');
export const getSkillsFilter = _getData('skills');

export const getResults = createSelector(
  getQueryFilter,
  getEntityFilter,
  getSkillsFilter,
  state => entity => state.entities.byId[entity],
  (query, entity, skills, fnGetEntities) => {
    const results = {};
    const entities = ['organizations', 'users'].indexOf(entity) !== -1 ?
      _.filter(fnGetEntities('users'), { type: types[entity] }) :
      fnGetEntities(entity);

    _.forEach(entities, (item) => {
      const record = format(item);
      const match = (
        latinize(record.title).toLowerCase().search(query) !== -1 &&
        (!skills.length || _.intersection(_.values(record.skills), skills).length)
      );

      if (match) {
        results[record.uid] = record;
      }
    });

    return results;
  },
);
