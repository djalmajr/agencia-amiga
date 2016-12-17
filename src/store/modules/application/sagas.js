import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
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

export default function* () {
  yield takeEvery('asdf', handleLogin);
  yield takeEvery('fdsa', handleLogout);
}
