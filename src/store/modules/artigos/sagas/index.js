import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { clear, updateCache, updateStatus } from '../actions';
import API from '../apis';

function* fetch(action) {
  const { clearResults, instancia, id } = action.payload;

  if (clearResults) {
    yield put(clear());
  }

  yield put(updateStatus(instancia, true));

  try {
    const fn = id ? 'fetchArtigo' : 'fetchArtigos';
    const response = yield API[fn](action.payload);

    yield put(updateCache(response));
  } catch (error) {
    yield put(updateCache(new Error(JSON.stringify(error))));
  } finally {
    yield put(updateStatus(instancia, false));
  }
}

export default function* () {
  yield takeEvery('ARTIGO_FETCH', fetch);
  yield takeEvery('ARTIGOS_FETCH', fetch);
}
