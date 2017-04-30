import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import Application from 'containers/Application';

const Root = ({ store }) => (
  <Provider store={store}>
    <Application />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
