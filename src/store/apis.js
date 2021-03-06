import { fb } from '~/constants';
import genUID from '~/helpers/gen-uid';

export const once = ref => fb.database().ref(ref).once('value');
export const set = (ref, data) => fb.database().ref(ref).set(data);

export const save = (ref, data) => {
  if (!data.uid) {
    data.uid = genUID(ref);
  }

  if (!data.createdAt) {
    data.createdAt = fb.database.ServerValue.TIMESTAMP;
  }

  data.updatedAt = fb.database.ServerValue.TIMESTAMP;

  return new Promise((resolve, reject) => {
    set(`${ref}/${data.uid}`, data)
      .then(() => once(`${ref}/${data.uid}`))
      .then(res => resolve(res.val()))
      .catch(reject);
  });
};

export const remove = ref => fb.database().ref(ref).remove();
export const updateProfile = data => fb.auth().currentUser.updateProfile(data);
export const updatePassword = data => fb.auth().currentUser.updatePassword(data);
export const login = (email, password) => fb.auth().signInWithEmailAndPassword(email, password);
export const logout = () => fb.auth().signOut();
export const register = (email, password) =>
  fb.auth().createUserWithEmailAndPassword(email, password);
