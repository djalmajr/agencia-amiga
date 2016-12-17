import thunk from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './sagas';

// let config = {
//   apiKey: 'AIzaSyAzTH_P735oVz2r5Ape5ZDj_o9RSzwl4k0',
//   authDomain: 'agencia-amiga.firebaseapp.com',
//   databaseURL: 'https://agencia-amiga.firebaseio.com',
//   storageBucket: 'agencia-amiga.appspot.com',
//   messagingSenderId: '323447297926',
// };

// firebase.initializeApp(config);

const configureStore = () => {
  const saga = createSagaMiddleware();
  const store = createStore(
    reducers,
    compose(
      applyMiddleware(saga, thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
  );

  saga.run(rootSaga);

  return store;
};

export default configureStore;
