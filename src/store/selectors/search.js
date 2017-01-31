import _ from 'lodash';
import latinize from 'latinize';
import { createSelector } from 'reselect';
import { Filter } from '~/constants';
import { isFetching } from './entities';

const format = data => ({
  title: data.name,
  meta: data.email,
  image: data.image,
  description: data.resume || data.description || '',
  created_at: data.created_at,
});

export const getFilter = state => state.search.filter;

export const isSearching = createSelector(
  getFilter,
  state => _.curry(isFetching)(_, state),
  ({ type }, fetchStatus) => {
    if (type === 'all') {
      const options = _.filter(Filter.OPTIONS, opt => opt !== 'all');

      return _.some(options.map(opt => fetchStatus[opt]));
    }

    return fetchStatus[type];
  },
);

export const getResults = (state) => {
  let result, byId = {};
  const { type, query } = getFilter(state);

  if (type === 'all') {
    _.forEach(_.omit(state.entities.byId, ['skills']), (value, entity) => {
      _.forEach(value, (val, id) => _.merge(byId, {
        [id]: { id, ...val, entity, ...format(val) },
      }));
    });

    result = _.values(byId);
  } else {
    byId = state.entities.byId[type];
    result = _.map(byId, (val, id) =>
      ({ id, ...val, entity: type, ...format(val) }),
    );
  }

  if (!_.isEmpty(filter.skills)) {
    result = _.filter(result, item =>
      !!_.intersection(_.values(item.skills), filter.skills).length,
    );
  }

  return query ?
    _.filter(result, item => latinize(item.title).toLowerCase().search(query) !== -1) :
    result;
};
