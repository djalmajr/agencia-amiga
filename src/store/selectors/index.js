import * as application from './application';
import * as auth from './auth';
import * as entities from './entities';
import * as filter from './filter';
import * as profile from './profile';

export default {
  ...application,
  ...auth,
  ...entities,
  ...filter,
  ...profile,
};
