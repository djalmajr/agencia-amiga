import { fb } from '~/constants';

export const read = ref =>
  new Promise((resolve, reject) => {
    fb.database().ref(ref).once('value')
      .then(res => resolve(res.val()))
      .catch(reject);
  });

export const create = (ref, data) =>
  new Promise((resolve, reject) => {
    fb.database().ref(ref).set(data)
      .then(res => resolve(res.val()))
      .catch(reject);
  });

export const login = (email, password) =>
  fb.auth().signInWithEmailAndPassword(email, password);

export const logout = () => fb.auth().signOut();

export const register = (email, password) =>
  fb.auth().createUserWithEmailAndPassword(email, password);
