import { fork } from 'redux-saga/effects';
import fetchUsuarios from './modules/usuarios/sagas';

export default function* () {
  yield [
    fork(fetchUsuarios),
  ];
}
