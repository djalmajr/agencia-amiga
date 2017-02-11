import _ from 'lodash';
import createGetData from '~/helpers/create-get-data';
import { getUser } from './auth';
import { getEntities } from './entities';

const getData = createGetData('profile');

const getOrganizationFeed = (state) => {
  const user = getUser(state);
  const campaigns = getEntities('campaigns')(state);
  const services = getEntities('services')(state);
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

export const isUpdatingProfile = getData('isUpdatingProfile');
export const getCurrentTabFeed = getData('currentTabFeed');
export const getFeed = (state) => {
  const user = getUser(state);

  return user.type === 'organization' ? getOrganizationFeed(state) : {};
};
