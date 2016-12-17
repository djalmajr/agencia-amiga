import * as appSelectors from './modules/application/selectors';
import * as entitiesSelectors from './modules/entities/selectors';

export default {
  ...appSelectors,
  ...entitiesSelectors,
};
