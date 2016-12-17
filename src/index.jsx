import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/configure-store';
import Application from './application';

const rootEl = document.querySelector('#wrapper');
const store = configureStore();

ReactDOM.render(
  <AppContainer>
    <Application store={store} />
  </AppContainer>,
  rootEl,
);

if (module.hot) {
  module.hot.accept('./application', () => {
    const NextApp = require('./application').default; // eslint-disable-line

    ReactDOM.render(
      <AppContainer>
        <NextApp store={store} />
      </AppContainer>,
      rootEl,
    );
  });
}
