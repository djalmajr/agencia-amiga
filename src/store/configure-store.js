import { throttle } from 'lodash';
import { applyMiddleware, createStore, compose } from 'redux';
import { middleware, outerReducer } from 'redux-async-initial-state';
import createSagaMiddleware from 'redux-saga';
import invariant from 'redux-immutable-state-invariant';
import reducers from './reducers';
import rootSaga from './sagas';
import { loadState, saveState } from './cache-state';

const DEV = process.env.NODE_ENV !== 'production';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  let middlewares = [sagaMiddleware, middleware(loadState)];

  if (DEV) {
    const { DevTools } = require('../devtools'); // eslint-disable-line
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

    middlewares = middlewares.concat([invariant()]);
    middlewares = applyMiddleware(...middlewares);
    middlewares = composeEnhancers ?
      composeEnhancers(middlewares) :
      compose(middlewares, DevTools.instrument());
  } else {
    middlewares = applyMiddleware(...middlewares);
  }

  const store = createStore(outerReducer(reducers), middlewares);

  store.runSaga = sagaMiddleware.run;

  store.subscribe(throttle(() => {
    const { application: { user } } = store.getState();

    saveState({ application: { user } });
  }, 2000));

  store.runSaga(rootSaga);

  return store;
};

export default configureStore;
