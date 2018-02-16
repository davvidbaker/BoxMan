import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware, push } from 'react-router-redux';

import Application from '../components/Application';
import store, { history } from '../store';

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Application />
    </ConnectedRouter>
  </Provider>
);

Root.propTypes = {};

export default Root;
