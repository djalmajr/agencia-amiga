import { fb } from '~/constants';

export const read = ref =>
  new Promise((resolve, reject) => {
    fb.database().ref(ref).once('value')
      .then(res => resolve(res.val()))
      .catch(reject);
  });

export const save = (ref, data) => fb.database().ref(data.uid ? `${ref}/${data.uid}` : ref).set(data);
export const saveAll = updates => fb.database().ref().update(updates);
export const updateProfile = data => fb.auth().currentUser.updateProfile(data);
export const updatePassword = data => fb.auth().currentUser.updatePassword(data);
export const login = (email, password) => fb.auth().signInWithEmailAndPassword(email, password);
export const logout = () => fb.auth().signOut();
export const register = (email, password) =>
  fb.auth().createUserWithEmailAndPassword(email, password);
