import _ from 'lodash';
import { createSelector } from 'reselect';
import { getEntity } from './entities';

export const getOrgFeed = createSelector(
  state => _.pick(state.auth.userData, ['campaigns', 'services']),
  (user) => {
    const feed = {};
    const options = {
      campaigns: { icon: 'bullhorn', text: 'a campanha' },
      services: { icon: 'wrench', text: 'o serviço' },
    };

    _.forEach(options, (val, ref) => {
      const items = _.map(user[ref], uid => getEntity(ref, uid));

      _.forEach(items, (item) => {
        feed[item.createdAt] = {
          icon: val.icon,
          text: item.name,
          pretext: `Você criou ${val.text}`,
        };

        if (item.createdAt < item.updatedAt) {
          feed[item.updatedAt] = {
            icon: val.icon,
            text: item.name,
            pretext: `Você atualizou ${val.text}`,
          };
        }
      });
    });
  },
);
