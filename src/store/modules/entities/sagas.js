import { map, filter } from 'lodash';
import { takeEvery } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import { getFilterOptions } from '../application/selectors';
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

function* handleGetAllEntities() {
  const filterOptions = yield select(getFilterOptions);
  const entities = map(filter(filterOptions, opt => opt.value !== 'all'), 'value');

  for (let i = 0, entity; (entity = entities[i]); i++) {
    yield put(updateEntitiesStatus({ entity, status: true }));
  }

  try {
    for (let i = 0, entity; (entity = entities[i]); i++) {
      const response = yield getEntities({ entity });

      yield put(updateEntitiesCache({ entity, response }));
    }
  } catch (err) {
    const error = new Error(JSON.stringify(err));

    for (let i = 0, entity; (entity = entities[i]); i++) {
      yield put(updateEntitiesCache({ entity, error }));
    }
  } finally {
    for (let i = 0, entity; (entity = entities[i]); i++) {
      yield put(updateEntitiesStatus({ entity, status: false }));
    }
  }
}

export default function* () {
  yield takeEvery('GET_ENTITIES', handleGetEntities);
  yield takeEvery('GET_ALL_ENTITIES', handleGetAllEntities);
}
