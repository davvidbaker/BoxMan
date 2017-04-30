import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from 'store';
import Root from 'containers/Root.js';

import 'styles/main.scss';

const store = configureStore({});

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
