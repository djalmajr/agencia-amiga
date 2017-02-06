import { combineReducers } from 'redux';
import { innerReducer } from 'redux-async-initial-state';
import * as auth from './auth';
import * as entities from './entities';
import * as filter from './filter';
import * as global from './global';
import * as profile from './profile';

export default combineReducers({
  asyncState: innerReducer,
  auth: combineReducers(auth),
  entities: combineReducers(entities),
  filter: combineReducers(filter),
  global: combineReducers(global),
  profile: combineReducers(profile),
});
