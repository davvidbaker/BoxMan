import React from 'react';
import ReactDOM from 'react-dom';

import store from 'store';
import Root from 'containers/Root.js';

import 'styles/main.scss';

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
