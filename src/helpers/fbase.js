import { fb } from '~/constants';

export const once = url => new Promise((resolve, reject) => {
  fb.database().ref(url).once('value')
    .then(snapshot => resolve(snapshot.val()))
    .catch(reject);
});
