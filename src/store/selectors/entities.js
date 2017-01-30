import _ from 'lodash';

export const isFetching = (state, entity) =>
  !!state.entities.isFetching[entity];

export const isRemoving = (state, entity, id) =>
  !!(state.entities.isRemoving[entity] || {})[id];

export const getEntities = (state, entity, id) => {
  const result = _.merge({}, state.entities.byId[entity]);

  return typeof id !== 'undefined' ? (result[id] || {}) : result;
};

export const getToRemove = (state, entity, id) => {
  const result = _.merge({}, state.entities.toRemove[entity]);

  return typeof id !== 'undefined' ? (result[id] || {}) : result;
};

const getOrganizationFeed = (state) => {
  const user = state.auth.userData;
  const campaigns = getEntities(state, 'campaigns');
  const services = getEntities(state, 'services');
  const feed = {};

  _.forEach(user.services, (uid) => {
    if (services[uid]) {
      feed[services[uid].createdAt] = {
        icon: 'wrench',
        text: services[uid].name,
        pretext: 'Você criou o servico',
      };

      if (services[uid].createdAt !== services[uid].updatedAt) {
        feed[services[uid].updatedAt] = {
          icon: 'wrench',
          text: services[uid].name,
          pretext: 'Você atualizou o servico',
        };
      }
    }
  });

  _.forEach(user.campaigns, (uid) => {
    if (campaigns[uid]) {
      feed[campaigns[uid].createdAt] = {
        icon: 'bullhorn',
        text: campaigns[uid].name,
        pretext: 'Você criou a campanha',
      };

      if (campaigns[uid].createdAt !== campaigns[uid].updatedAt) {
        feed[campaigns[uid].updatedAt] = {
          icon: 'bullhorn',
          text: campaigns[uid].name,
          pretext: 'Você atualizou a campanha',
        };
      }
    }
  });

  return feed;
};

export const getFeed = (state) => {
  const user = state.auth.userData;

  return user.type === 'organization' ?
    getOrganizationFeed(state) :
    {};
};
