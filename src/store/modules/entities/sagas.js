import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { getEntities } from './apis';
import { updateEntitiesCache, updateEntitiesStatus } from './actions';

function* handleGetEntities(action) {
  const { entity } = action.payload || {};

  yield put(updateEntitiesStatus({ entity, status: true }));

  try {
    const response = yield getEntities({ entity });

    yield put(updateEntitiesCache({ entity, response }));
  } catch (err) {
    const error = new Error(JSON.stringify(err));

    yield put(updateEntitiesCache({ entity, error }));
  } finally {
    yield put(updateEntitiesStatus({ entity, status: false }));
  }
}

export default function* () {
  yield takeEvery('GET_ENTITIES', handleGetEntities);
}
