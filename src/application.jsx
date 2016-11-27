import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Match } from 'react-router';
import Main from './views/layout/main';

const Application = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <Match pattern="/" component={Main} />
    </HashRouter>
  </Provider>
);

Application.propTypes = {
  store: React.PropTypes.object,
};

export default Application;
