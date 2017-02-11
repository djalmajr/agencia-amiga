import { takeEvery } from 'redux-saga';
import * as authSaga from './auth';
import * as entitySaga from './entities';
import * as profileSaga from './profile';
import * as actions from '../actions';

export default function* () {
  // Auth
  yield takeEvery(actions.login.toString(), authSaga.login);
  yield takeEvery(actions.logout.toString(), authSaga.logout);
  yield takeEvery(actions.register.toString(), authSaga.register);

  // Entities
  yield takeEvery(actions.read.toString(), entitySaga.read);
  yield takeEvery(actions.remove.toString(), entitySaga.remove);
  yield takeEvery(actions.save.toString(), entitySaga.save);

  // Profile
  yield takeEvery(actions.addToOrg.toString(), profileSaga.addToOrg);
  yield takeEvery(actions.updateProfile.toString(), profileSaga.update);
}
