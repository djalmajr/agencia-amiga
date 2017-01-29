import { fb } from '~/constants';
import genUID from '~/helpers/gen-uid';

export const read = ref =>
  new Promise((resolve, reject) => {
    fb.database().ref(ref).once('value')
      .then(res => resolve(res.val()))
      .catch(reject);
  });

export const save = (ref, data) => {
  if (!data.uid) {
    data.uid = genUID(ref);
  }

  if (!data.createdAt) {
    data.createdAt = fb.database.ServerValue.TIMESTAMP;
  }

  data.updatedAt = fb.database.ServerValue.TIMESTAMP;

  return new Promise((resolve, reject) => {
    fb.database().ref(`${ref}/${data.uid}`).set(data)
      .then(() => read(`${ref}/${data.uid}`).then(resolve))
      .catch(reject);
  });
};

export const saveAll = updates => fb.database().ref().update(updates);
export const updateProfile = data => fb.auth().currentUser.updateProfile(data);
export const updatePassword = data => fb.auth().currentUser.updatePassword(data);
export const login = (email, password) => fb.auth().signInWithEmailAndPassword(email, password);
export const logout = () => fb.auth().signOut();
export const register = (email, password) =>
  fb.auth().createUserWithEmailAndPassword(email, password);
