import _ from 'lodash';
import { put, select } from 'redux-saga/effects';
import selectors from '../selectors';
import * as actions from '../actions';
import * as api from '../apis';

export function* update({ payload }) {
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

export function* addToOrg({ payload: { data, entity } }) {
  try {
    const user = yield select(selectors.getUser);
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
