import thunk from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './sagas';

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
