import _ from 'lodash';
import { put } from 'redux-saga/effects';
import { fb } from '~/constants';
import * as actions from '../actions';
import * as api from '../apis';

export function* login(action) {
  const { email, password } = action.payload;
  const entities = ['skills', 'services', 'campaigns'];

  try {
    const auth = (yield api.login(email, password)).toJSON();
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

export function* logout() {
  try {
    yield api.logout();
    yield put(actions.unauthorize());
  } catch (err) {
    yield put(actions.notifyError(err));
    yield put(actions.unauthorize(new Error(JSON.stringify(err))));
  }
}

export function* register(action) {
  const { email, password, type } = action.payload;

  try {
    const auth = (yield api.register(email, password)).toJSON();
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
