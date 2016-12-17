import { fork } from 'redux-saga/effects';
import fetchEntities from './modules/entities/sagas';

export default function* () {
  yield [
    fork(fetchEntities),
  ];
}
