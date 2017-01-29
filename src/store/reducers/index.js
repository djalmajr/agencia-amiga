import { combineReducers } from 'redux';
import { innerReducer } from 'redux-async-initial-state';
import * as auth from './auth';
import * as global from './global';
import * as search from './search';
import * as entities from './entities';

export default combineReducers({
  asyncState: innerReducer,
  auth: combineReducers(auth),
  global: combineReducers(global),
  search: combineReducers(search),
  entities: combineReducers(entities),
});
