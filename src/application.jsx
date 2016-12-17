import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Match } from 'react-router';
import Main from './views/containers/main';

const Application = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Match pattern="/" component={Main} />
    </BrowserRouter>
  </Provider>
);

Application.propTypes = {
  store: React.PropTypes.object,
};

export default Application;
