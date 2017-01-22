import firebase from 'firebase';

firebase.initializeApp({
  apiKey: 'AIzaSyAzTH_P735oVz2r5Ape5ZDj_o9RSzwl4k0',
  authDomain: 'agencia-amiga.firebaseapp.com',
  databaseURL: 'https://agencia-amiga.firebaseio.com',
  storageBucket: 'agencia-amiga.appspot.com',
  messagingSenderId: '323447297926',
});

export const fb = firebase;

export const Cache = {
  KEY: 'AGENCIA_AMIGA_STATE',
};

window.fb = fb;
