import { fork } from 'redux-saga/effects';
import fetchArtigos from './modules/artigos/sagas';
import fetchEtiquetas from './modules/etiquetas/sagas';

export default function* () {
  yield [
    fork(fetchArtigos),
    fork(fetchEtiquetas),
  ];
}
