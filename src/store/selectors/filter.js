import _ from 'lodash';
import latinize from 'latinize';
import { createSelector } from 'reselect';
// import { Filter } from '~/constants';
import createGetData from '~/helpers/create-get-data';
import { getEntities } from './entities';

const _getData = createGetData('filter');

const format = data => ({
  title: data.name,
  meta: data.email,
  image: data.image,
  description: data.resume || data.description || '',
  created_at: data.created_at,
});

export const isFiltering = _getData('isFiltering');
export const getQueryFilter = _getData('query');
export const getEntityFilter = _getData('entity');
export const getSkillsFilter = _getData('skills');

export const getResults = createSelector(
  getQueryFilter,
  getEntityFilter,
  getSkillsFilter,
  state => _.curry(getEntities)(_, state),
  (query, entity, skills, entityNames, fnGetEntities) => {
    const results = {};

    _.forEach(fnGetEntities(entity), (item) => {
      const match = (
        latinize(item.title).toLowerCase().search(query) !== -1 &&
        (!skills.length || _.intersection(_.values(item.skills), skills).length)
      );

      if (match) {
        results[item.uid] = format(item);
      }
    });

    return results;
  },
);
