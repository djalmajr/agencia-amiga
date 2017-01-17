import { map, filter } from 'lodash';
import { takeEvery } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import * as selectors from './selectors';
import * as Actions from './actions';
import * as API from './apis';

function* handleLogin(action) {
  const { username, password } = action.payload;

  try {
    const response = yield API.login(username, password);

    yield put(Actions.authorize(response));
  } catch (error) {
    yield put(Actions.notify(error));
    yield put(Actions.authorize(new Error(JSON.stringify(error))));
  }
}

function* handleLogout() {
  try {
    yield API.logout();
    yield put(Actions.unauthorize());
  } catch (error) {
    yield put(Actions.notify(error));
    yield put(Actions.unauthorize(new Error(JSON.stringify(error))));
  }
}

function* handleGetEntities(action) {
  const { entity } = action.payload || {};

  yield put(Actions.updateEntitiesStatus({ entity, status: true }));

  try {
    const response = yield API.getEntities({ entity });

    yield put(Actions.updateEntitiesCache({ entity, response }));
  } catch (err) {
    const error = new Error(JSON.stringify(err));

    yield put(Actions.updateEntitiesCache({ entity, error }));
  } finally {
    yield put(Actions.updateEntitiesStatus({ entity, status: false }));
  }
}

function* handleGetAllEntities() {
  const filterOptions = yield select(selectors.getFilterOptions);
  const entities = map(filter(filterOptions, opt => opt.value !== 'all'), 'value');

  for (let i = 0, entity; (entity = entities[i]); i++) {
    yield put(Actions.updateEntitiesStatus({ entity, status: true }));
  }

  try {
    for (let i = 0, entity; (entity = entities[i]); i++) {
      const response = yield API.getEntities({ entity });

      yield put(Actions.updateEntitiesCache({ entity, response }));
    }
  } catch (err) {
    const error = new Error(JSON.stringify(err));

    for (let i = 0, entity; (entity = entities[i]); i++) {
      yield put(Actions.updateEntitiesCache({ entity, error }));
    }
  } finally {
    for (let i = 0, entity; (entity = entities[i]); i++) {
      yield put(Actions.updateEntitiesStatus({ entity, status: false }));
    }
  }
}

export default function* () {
  yield takeEvery('asdf', handleLogin);
  yield takeEvery('fdsa', handleLogout);
  yield takeEvery('GET_ENTITIES', handleGetEntities);
  yield takeEvery('GET_ALL_ENTITIES', handleGetAllEntities);
}
