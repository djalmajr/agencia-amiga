// import faker from 'faker';
import latinize from 'latinize';
// import { createSelector } from 'reselect';
import { isEmpty, intersection, omit, merge, filter, forEach, some, values } from 'lodash';
// import { getEntities } from '../entities/selectors';

export const getNotification = state => merge({}, state.application.notification);

export const getUserMenuVisibility = state => state.application.isUserMenuVisible;

// ==============================================
//  Search Selectors
// ==============================================

export const getFilterOptions = () => [
  { text: 'Todos', value: 'all', icon: 'globe' },
  { text: 'Organizações', value: 'organizations', icon: 'university' },
  { text: 'Serviços', value: 'services', icon: 'wrench' },
  { text: 'Pessoas', value: 'users', icon: 'user' },
  { text: 'Campanhas', value: 'campaigns', icon: 'bullhorn' },
];

export const getSearchFilter = state =>
  state.application.searchFilter;

export const getSearchQuery = state =>
  state.application.searchQuery;

export const getSearchStatus = (state) => {
  const searchFilter = getSearchFilter(state);

  if (searchFilter.filter === 'all') {
    return some(values(state.entities.isFetching));
  }

  return state.entities.isFetching[searchFilter.filter];
};

export const getSearchResults = (state) => {
  let result, byId = {};

  const searchFilter = getSearchFilter(state);
  const query = getSearchQuery(state);
  const format = data => ({
    title: data.name,
    meta: data.email,
    // image: data.image || faker.image.imageUrl(100, 100, 'abstract'),
    image: data.image,
    description: data.resume || data.description || '',
    created_at: data.created_at,
  });

  if (!isEmpty(searchFilter.filter)) {
    if (searchFilter.filter === 'all') {
      forEach(omit(state.entities.byId, ['skills']), (value, entity) => {
        forEach(value, (val, key) => merge(byId, {
          [key]: { ...val, entity, ...format(val) },
        }));
      });

      result = values(byId);
    } else {
      byId = state.entities.byId[searchFilter.filter];
      result = values(byId).map(val => ({ ...val, entity: searchFilter.filter, ...format(val) }));
    }
  }

  if (!isEmpty(searchFilter.skills)) {
    result = filter(result, item =>
      !!intersection(values(item.skills), searchFilter.skills).length,
    );
  }

  return query ?
    filter(result, item => latinize(item.title).toLowerCase().search(query) !== -1) :
    result;
};
