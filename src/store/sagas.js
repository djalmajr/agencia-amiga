import _ from 'lodash';
import { takeEvery } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import { fb } from '~/constants';
import selectors from './selectors';
import * as actions from './actions';
import * as api from './apis';

function* handleLogin(action) {
  const { email, password } = action.payload;
  const entities = ['skills', 'services', 'campaigns'];

  try {
    const authResp = yield api.login(email, password);
    const auth = authResp.toJSON();
    const userSnap = yield fb.database().ref(`/users/${auth.uid}`).once('value');
    const user = userSnap.val();

    for (let i = 0, entity; (entity = entities[i]); i++) {
      if (userSnap.hasChild(entity)) {
        const response = {};
        const snapshot = yield fb.database().ref(entity).once('value');

        _.forEach(user[entity], (uid) => {
          if (snapshot.hasChild(uid)) {
            response[uid] = snapshot.child(uid).val();
          }
        });

        yield put(actions.updateCache({ entity, response }));
      }
    }

    yield put(actions.authorize(auth));
    yield put(actions.updateCache({ entity: 'users', response: { [user.uid]: user } }));
  } catch (err) {
    console.log(err); // eslint-disable-line
    yield put(actions.notifyError(err));
    yield put(actions.authorize(new Error(JSON.stringify(err))));
  }
}

function* handleLogout() {
  try {
    yield api.logout();
    yield put(actions.unauthorize());
  } catch (err) {
    yield put(actions.notifyError(err));
    yield put(actions.unauthorize(new Error(JSON.stringify(err))));
  }
}

function* handleRegister(action) {
  const { email, password, type } = action.payload;

  try {
    const response = yield api.register(email, password);
    const auth = response.toJSON();
    const user = { uid: auth.uid, email, type };

    yield api.save('users', user);
    yield put(actions.authorize(auth));
    yield put(actions.updateCache({ entity: 'users', response: { [user.uid]: user } }));
  } catch (err) {
    const error = JSON.parse(JSON.stringify(err));
    const message = 'Ocorreu um erro ao tentar realizar a ação solicitada. Por favor, tente novamente.';

    console.error(err, error); // eslint-disable-line

    yield put(actions.notifyError(error.message || message));
    yield put(actions.authorize(err));
  }
}

function* handleRead(action) {
  const { entity } = action.payload || {};

  try {
    const response = yield api.read(entity);

    yield put(actions.updateCache({ entity, response }));
  } catch (err) {
    const error = JSON.parse(JSON.stringify(err));
    const message = error.code === 'PERMISSION_DENIED' ?
      'Sua sessão expirou. Por favor, faça login novamente' :
      'Ocorreu um erro ao tentar realizar a ação solicitada. Por favor, tente novamente.';

    yield put(actions.notifyError(error.message || message));
    yield put(actions.updateCache(err));
  }
}

function* handleRemove(action) {
  const { entity, uid } = action.payload;

  try {
    yield api.remove(`${entity}/${uid}`);

    if (entity === 'services' || entity === 'campaigns') {
      let user = yield select(selectors.getUserData);

      user = _.merge({}, user);
      delete user[entity][uid];
      user = yield api.save('users', user);

      yield put(actions.updateCache({ entity: 'users', response: { [user.uid]: user } }));
    }

    yield put(actions.removeCache({ entity, uid }));
  } catch (err) {
    console.log(err); // eslint-disable-line
    yield put(actions.notifyError(err));
    yield put(actions.removeCache(err));
  }
}

function* handleSave(action) {
  const { ref, data } = action.payload || {};

  try {
    const res = yield api.save(ref, data);

    yield put(actions.updateCache({ entity: ref, response: { [res.uid]: res } }));
  } catch (err) {
    console.log(err); // eslint-disable-line
    yield put(actions.notifyError(err));
    yield put(actions.save(err));
  }
}

function* handleUpdateProfile({ payload }) {
  const { password, ...userData } = payload;

  try {
    const user = yield api.save('users', userData);

    yield api.updateProfile({ displayName: payload.name });

    if (password) {
      yield api.updatePassword(password);
    }

    yield put(actions.notify('Dados atualizados!'));
    yield put(actions.updateCache({ entity: 'users', response: { [user.uid]: user } }));
  } catch (err) {
    console.log(err); // eslint-disable-line
    yield put(actions.notifyError(err));
    yield put(actions.updateCache(err));
  }
}

function* handleAddToOrg({ payload: { data, entity } }) {
  try {
    const user = yield select(selectors.getUserData);
    const res = yield api.save(entity, data);
    const val = yield api.save('users', _.merge({}, user, {
      [entity]: { [res.uid]: res.uid },
    }));

    yield put(actions.updateCache({ entity, response: { [res.uid]: res } }));
    yield put(actions.updateCache({ entity: 'users', response: { [val.uid]: val } }));
  } catch (err) {
    console.log(err); // eslint-disable-line
    yield put(actions.notifyError(err));
    yield put(actions.updateCache(err));
  }
}

export default function* () {
  yield takeEvery(actions.addToOrg.toString(), handleAddToOrg);
  yield takeEvery(actions.login.toString(), handleLogin);
  yield takeEvery(actions.logout.toString(), handleLogout);
  yield takeEvery(actions.register.toString(), handleRegister);
  yield takeEvery(actions.read.toString(), handleRead);
  yield takeEvery(actions.remove.toString(), handleRemove);
  yield takeEvery(actions.save.toString(), handleSave);
  yield takeEvery(actions.updateProfile.toString(), handleUpdateProfile);
}
