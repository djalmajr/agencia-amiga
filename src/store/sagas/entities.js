import _ from 'lodash';
import { put, select } from 'redux-saga/effects';
import selectors from '../selectors';
import * as actions from '../actions';
import * as api from '../apis';

const attrs = {
  users: ['skills', 'services', 'campaigns'],
};

export function* read(action) {
  const { uid, entity } = action.payload || {};
  const type = entity === 'organizations' ? 'users' : entity;

  try {
    const snapshot = yield api.once(uid ? `${type}/${uid}` : type);
    const val = snapshot.val();

    if (attrs[type]) {
      for (let i = 0, attr; (attr = attrs[type][i]); i++) {
        if (snapshot.hasChild(attr)) {
          const res = {};
          const snap = yield api.once(attr);

          _.forEach(val[attr], (id) => {
            if (snap.hasChild(id)) {
              res[id] = snap.child(id).val();
            }
          });

          yield put(actions.updateCache({ entity: attr, response: res }));
        }
      }
    }

    yield put(actions.updateCache({ entity: type, response: uid ? { [uid]: val } : val }));
  } catch (err) {
    const error = JSON.parse(JSON.stringify(err));
    const message = error.code === 'PERMISSION_DENIED' ?
      'Sua sessão expirou. Por favor, faça login novamente' :
      'Ocorreu um erro ao tentar realizar a ação solicitada. Por favor, tente novamente.';

    yield put(actions.notifyError(error.message || message));
    yield put(actions.updateCache(err));
  }
}

export function* remove(action) {
  const { entity, uid } = action.payload;

  try {
    yield api.remove(`${entity}/${uid}`);

    if (entity === 'services' || entity === 'campaigns') {
      let user = yield select(selectors.getUser);

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

export function* save(action) {
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
