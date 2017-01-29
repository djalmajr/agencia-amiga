import _ from 'lodash';
import { takeEvery } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import genUID from '~/helpers/gen-uid';
import * as selectors from './selectors';
import * as actions from './actions';
import * as api from './apis';

const authAttrs = [
  'displayName', 'photoURL', 'emailVerified', 'isAnonymous', 'providerData',
  'apiKey', 'appName', 'authDomain', 'stsTokenManager', 'redirectEventId',
];

function* handleLogin(action) {
  const { email, password } = action.payload;

  try {
    const response = yield api.login(email, password);
    const auth = response.toJSON();
    const user = yield api.read(`/users/${auth.uid}`);

    yield put(actions.authorize({ ...auth, ...user }));
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
  const { email, password, type } = action.payload;

  try {
    const response = yield api.register(email, password);
    const auth = response.toJSON();
    const user = { uid: auth.uid, email, type };

    yield api.save('users', user);
    yield put(actions.authorize({ ...auth, ...user }));
  } catch (err) {
    const error = JSON.parse(JSON.stringify(err));
    const message = err.code === 'PERMISSION_DENIED' ?
      'Sua sessão expirou. Por favor, faça login novamente' :
      'Ocorreu um erro ao tentar realizar a ação solicitada. Por favor, tente novamente.';

    console.error(err, error); // eslint-disable-line

    yield put(actions.notifyError(error.message || message));
    yield put(actions.authorize(err));
  }
}

function* handleReadError(err, showNotification = true) {
  const error = JSON.parse(JSON.stringify(err));
  const message = error.code === 'PERMISSION_DENIED' ?
    'Sua sessão expirou. Por favor, faça login novamente' :
    'Ocorreu um erro ao tentar realizar a ação solicitada. Por favor, tente novamente.';

  if (showNotification) {
    yield put(actions.notifyError(error.message || message));
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
  const entities = _.map(_.filter(filterOptions, opt => opt.value !== 'all'), 'value');

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

function* handleSave(action) {
  const { ref, data } = action.payload || {};

  try {
    yield api.save(ref, data);
    yield put(actions.updateCache({ entity: ref, response: { [data.uid]: data } }));
  } catch (err) {
    console.log(err); // eslint-disable-line
    yield put(actions.notifyError(err));
    yield put(actions.save(err));
  }
}

function* handleUpdateProfile({ payload }) {
  const { password, ...user } = payload;

  yield put(actions.updateProfileStatus(true));

  try {
    yield api.updateProfile({ displayName: payload.name });
    yield api.save('users', user);

    if (password) {
      yield api.updatePassword(password);
    }

    yield put(actions.notify('Dados atualizados!'));
    yield put(actions.updateUserCache(user));
    yield put(actions.updateCache({ entity: 'users', response: { [user.uid]: user } }));
  } catch (err) {
    console.log(err); // eslint-disable-line
    yield put(actions.notifyError(err));
    yield put(actions.updateProfile(err));
  } finally {
    yield put(actions.updateProfileStatus(false));
  }
}

function* handleAddToOrg({ payload: { formData, entity } }) {
  const user = yield select(selectors.getUser);
  const data = _.merge({}, formData, { uid: genUID(entity) });
  const newUser = _.merge({}, _.omit(user, authAttrs), { services: { [data.uid]: data.uid } });

  yield put(actions.updateStatus({ entity, status: true }));

  try {
    yield api.save(entity, data);
    yield api.save('users', newUser);

    yield put(actions.notify('Criado com sucesso!'));
    yield put(actions.updateUserCache(newUser));
    yield put(actions.updateCache({ entity: 'users', response: { [newUser.uid]: newUser } }));
  } catch (err) {
    console.log(err); // eslint-disable-line
    yield put(actions.notifyError(err));
    yield put(actions.createService(err));
  } finally {
    yield put(actions.updateStatus({ entity, status: false }));
  }
}

export default function* () {
  yield takeEvery(actions.addToOrg.toString(), handleAddToOrg);
  yield takeEvery(actions.login.toString(), handleLogin);
  yield takeEvery(actions.logout.toString(), handleLogout);
  yield takeEvery(actions.register.toString(), handleRegister);
  yield takeEvery(actions.read.toString(), handleRead);
  yield takeEvery(actions.readAll.toString(), handleReadAll);
  yield takeEvery(actions.save.toString(), handleSave);
  yield takeEvery(actions.updateProfile.toString(), handleUpdateProfile);
}
