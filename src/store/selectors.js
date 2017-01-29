import _ from 'lodash';
import latinize from 'latinize';
// import { createSelector } from 'reselect';

const format = data => ({
  title: data.name,
  meta: data.email,
  image: data.image,
  description: data.resume || data.description || '',
  created_at: data.created_at,
});

export const isFetching = (state, entity) => state.entities.isFetching[entity];
export const isLoadingState = state => state.asyncState.loading;
export const isUpdatingProfile = state => state.application.isUpdatingProfile;
export const getAuthData = state => state.application.authData;
export const getUserData = state => state.application.userData;
export const getNotification = state => state.application.notification;
export const getUserMenuVisibility = state => state.application.isUserMenuVisible;

// ==============================================
//  Auth
// ==============================================

export const isAuthenticated = state => !_.isEmpty(state.application.userData);
export const isAuthenticating = state => state.application.isAuthenticating;
export const isRegistering = state => state.application.isRegistering;

// ==============================================
//  Search Selectors
// ==============================================

export const getFilterOptions = () => [
  { text: 'Todos', value: 'all', icon: 'globe' },
  { text: 'Organizações', value: 'organizations', icon: 'university' },
  { text: 'Serviços', value: 'services', icon: 'wrench' },
  { text: 'Voluntários', value: 'users', icon: 'user' },
  { text: 'Campanhas', value: 'campaigns', icon: 'bullhorn' },
];

export const getAppliedFilter = state =>
  state.application.appliedFilter;

export const getSelectedFilter = state =>
  state.application.selectedFilter;

export const getSearchQuery = state =>
  state.application.searchQuery;

export const getSearchStatus = (state) => {
  const appliedFilter = getAppliedFilter(state);

  if (appliedFilter.filter === 'all') {
    return _.some(_.values(state.entities.isFetching));
  }

  return state.entities.isFetching[appliedFilter.filter];
};

export const getSearchResults = (state) => {
  let result, byId = {};
  const appliedFilter = getAppliedFilter(state);
  const query = getSearchQuery(state);

  if (!_.isEmpty(appliedFilter.filter)) {
    if (appliedFilter.filter === 'all') {
      _.forEach(_.omit(state.entities.byId, ['skills']), (value, entity) => {
        _.forEach(value, (val, id) => _.merge(byId, {
          [id]: { id, ...val, entity, ...format(val) },
        }));
      });

      result = _.values(byId);
    } else {
      byId = state.entities.byId[appliedFilter.filter];
      result = _.map(byId, (val, id) =>
        ({ id, ...val, entity: appliedFilter.filter, ...format(val) }),
      );
    }
  }

  if (!_.isEmpty(appliedFilter.skills)) {
    result = _.filter(result, item =>
      !!_.intersection(_.values(item.skills), appliedFilter.skills).length,
    );
  }

  return query ?
    _.filter(result, item => latinize(item.title).toLowerCase().search(query) !== -1) :
    result;
};

export const getEntities = (state, entity, id) => {
  const result = _.merge({}, state.entities.byId[entity]);

  return id ? (result[id] || {}) : result;
};
