// import { createSelector } from 'reselect';
import { merge, forEach, some, values } from 'lodash';
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
  { text: 'Pessoas', value: 'users', icon: 'users' },
  { text: 'Campanhas', value: 'campaigns', icon: 'bullhorn' },
];

export const getSearchFilter = state =>
  state.application.searchFilter;

export const getSearchQuery = state =>
  state.application.mainMenuQuery;

export const getSearchStatus = (state) => {
  const filter = getSearchFilter(state);

  if (filter === 'all') {
    return some(values(state.entities.isFetching));
  }

  return state.entities.isFetching[filter];
};

export const getSearchResults = (state) => {
  const filter = getSearchFilter(state);
  const format = data => ({
    title: data.nome,
    meta: data.email,
    description: data.resumo || '',
    created_at: data.created_at,
  });

  if (filter === 'all') {
    const byId = {};

    forEach(state.entities.byId, (value) => {
      forEach(value, (val, key) => merge(byId, {
        [key]: format(val),
      }));
    });

    return values(byId);
  }

  return values(state.entities.byId[filter])
    .map(val => format(val));
};
