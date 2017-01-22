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

function* handleReadError(err, showNotification = true) {
  const { code } = JSON.parse(JSON.stringify(err));
  const message = code === 'PERMISSION_DENIED' ?
    'Sua sessão expirou. Por favor, faça login novamente' :
    'Ocorreu um erro ao tentar realizar a ação solicitada. Por favor, tente novamente.';

  if (showNotification) {
    yield put(actions.notifyError(message));
  }

  yield put(actions.updateCache(err));
}

function* handleRead(action) {
  const { entity } = action.payload || {};

  yield put(actions.updateStatus({ entity, status: true }));

  try {
    const response = yield api.read(entity);

    yield put(actions.updateCache({ entity, response }));
  } catch (err) {
    yield handleReadError(err);
  } finally {
    yield put(actions.updateStatus({ entity, status: false }));
  }
}

function* handleReadAll() {
  const filterOptions = yield select(selectors.getFilterOptions);
  const entities = map(filter(filterOptions, opt => opt.value !== 'all'), 'value');

  for (let i = 0, entity; (entity = entities[i]); i++) {
    yield put(actions.updateStatus({ entity, status: true }));
  }

  try {
    for (let i = 0, entity; (entity = entities[i]); i++) {
      const response = yield api.read(entity);

      yield put(actions.updateCache({ entity, response }));
    }
  } catch (err) {
    yield handleReadError(err, false);
  } finally {
    for (let i = 0, entity; (entity = entities[i]); i++) {
      yield put(actions.updateStatus({ entity, status: false }));
    }
  }
}

export default function* () {
  yield takeEvery(actions.login.toString(), handleLogin);
  yield takeEvery(actions.logout.toString(), handleLogout);
  yield takeEvery(actions.register.toString(), handleRegister);
  yield takeEvery(actions.read.toString(), handleRead);
  yield takeEvery(actions.readAll.toString(), handleReadAll);
}
