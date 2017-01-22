import { fb } from '~/constants';

export default ref => fb.database().ref().child(ref).push().key;
