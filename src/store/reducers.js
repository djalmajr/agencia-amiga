import { combineReducers } from 'redux';
import application from './modules/application/reducers';
import entities from './modules/entities/reducers';

export default combineReducers({
  application,
  entities,
});
