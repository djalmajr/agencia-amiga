import { map, filter } from 'lodash';
import { takeEvery } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import * as selectors from './selectors';
import * as actions from './actions';
import * as api from './apis';

function* handleLogin(action) {
  const { email, password } = action.payload;

  try {
    const response = yield api.login(email, password);

    yield put(actions.authorize(response.toJSON()));
  } catch (error) {
    yield put(actions.notifyError(error));
    yield put(actions.authorize(new Error(JSON.stringify(error))));
  }
}

function* handleLogout() {
  try {
    yield api.logout();
    yield put(actions.unauthorize());
  } catch (error) {
    yield put(actions.notifyError(error));
    yield put(actions.unauthorize(new Error(JSON.stringify(error))));
  }
}

function* handleRegister(action) {
  const { email, password } = action.payload;

  try {
    const response = yield api.register(email, password);

    yield put(actions.authorize(response.toJSON()));
  } catch (error) {
    yield put(actions.notifyError(error));
    yield put(actions.authorize(new Error(JSON.stringify(error))));
  }
}

function* handleGetEntities(action) {
  const { entity } = action.payload || {};

  yield put(actions.updateEntitiesStatus({ entity, status: true }));

  try {
    const response = yield api.getEntities({ entity });

    yield put(actions.updateEntitiesCache({ entity, response }));
  } catch (err) {
    const error = new Error(JSON.stringify(err));

    yield put(actions.updateEntitiesCache({ entity, error }));
  } finally {
    yield put(actions.updateEntitiesStatus({ entity, status: false }));
  }
}

function* handleGetAllEntities() {
  const filterOptions = yield select(selectors.getFilterOptions);
  const entities = map(filter(filterOptions, opt => opt.value !== 'all'), 'value');

  for (let i = 0, entity; (entity = entities[i]); i++) {
    yield put(actions.updateEntitiesStatus({ entity, status: true }));
  }

  try {
    for (let i = 0, entity; (entity = entities[i]); i++) {
      const response = yield api.getEntities({ entity });

      yield put(actions.updateEntitiesCache({ entity, response }));
    }
  } catch (err) {
    const error = new Error(JSON.stringify(err));

    for (let i = 0, entity; (entity = entities[i]); i++) {
      yield put(actions.updateEntitiesCache({ entity, error }));
    }
  } finally {
    for (let i = 0, entity; (entity = entities[i]); i++) {
      yield put(actions.updateEntitiesStatus({ entity, status: false }));
    }
  }
}

export default function* () {
  yield takeEvery(actions.login.toString(), handleLogin);
  yield takeEvery(actions.logout.toString(), handleLogout);
  yield takeEvery(actions.register.toString(), handleRegister);
  yield takeEvery(actions.getEntities.toString(), handleGetEntities);
  yield takeEvery(actions.getAllEntities.toString(), handleGetAllEntities);
}
