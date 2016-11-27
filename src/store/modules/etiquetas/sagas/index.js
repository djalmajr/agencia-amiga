import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { updateCache, updateStatus } from '../actions';
import API from '../apis';

export default function* () {
  yield takeEvery('ETIQUETAS_FETCH', function* fetch() {
    yield put(updateStatus(true));

    try {
      const response = yield API.fetchEtiquetas();

      yield put(updateCache(response));
    } catch (error) {
      yield put(updateCache(new Error(JSON.stringify(error))));
    } finally {
      yield put(updateStatus(false));
    }
  });
}
