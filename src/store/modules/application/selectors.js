// import faker from 'faker';
import latinize from 'latinize';
// import { createSelector } from 'reselect';
import { merge, filter, forEach, some, values } from 'lodash';
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

  if (searchFilter === 'all') {
    return some(values(state.entities.isFetching));
  }

  return state.entities.isFetching[searchFilter];
};

export const getSearchResults = (state) => {
  let result;

  const searchFilter = getSearchFilter(state);
  const query = getSearchQuery(state);
  const format = data => ({
    title: data.nome,
    meta: data.email,
    // image: data.image || faker.image.imageUrl(100, 100, 'abstract'),
    image: data.image,
    description: data.resumo || data.descricao || '',
    created_at: data.created_at,
  });

  if (searchFilter === 'all') {
    const byId = {};

    forEach(state.entities.byId, (value, entity) => {
      forEach(value, (val, key) => merge(byId, {
        [key]: { entity, ...format(val) },
      }));
    });

    result = values(byId);
  } else {
    result = values(state.entities.byId[searchFilter])
    .map(val => ({ entity: searchFilter, ...format(val) }));
  }

  return query ?
    filter(result, item => latinize(item.title).toLowerCase().search(query) !== -1) :
    result;
};
