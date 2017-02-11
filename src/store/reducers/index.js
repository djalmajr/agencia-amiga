import { combineReducers } from 'redux';
import { innerReducer as asyncState } from 'redux-async-initial-state';
import * as auth from './auth';
import * as entities from './entities';
import * as filter from './filter';
import * as application from './application';
import * as profile from './profile';

export default combineReducers({
  application: combineReducers({ ...application, asyncState }),
  auth: combineReducers(auth),
  entities: combineReducers(entities),
  filter: combineReducers(filter),
  profile: combineReducers(profile),
});
