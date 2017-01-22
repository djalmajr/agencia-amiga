import { fb } from '~/constants';

export const getEntities = ({ id, entity }) =>
  new Promise((resolve, reject) => {
    fb.database()
      .ref(id ? `${entity}/${id}` : entity).once('value')
      .then(snapshot => resolve(snapshot.val()))
      .catch(reject);
  });

export const login = (email, password) =>
  fb.auth().signInWithEmailAndPassword(email, password);

export const logout = () => fb.auth().signOut();

export const register = (email, password) =>
  fb.auth().createUserWithEmailAndPassword(email, password);
