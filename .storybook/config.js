import * as React from 'react';
import { Provider } from 'react-redux';
import { configure, addDecorator } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import { themes } from '@storybook/components';

import fixtures from '../src/fixtures';
import initializeStore from '../src/store';
import GlobalStyle from '../src/components/GlobalStyle';

const req = require.context('../src', true, /.*stories.jsx?$/);

const store = initializeStore(fixtures);

addDecorator(
  withOptions({
    name: 'Box Man',
    theme: {
      ...themes.normal,
      mainBackground: '#FFC977',
      brand: {
        background: '#CD874D',
        color: 'white'
      },
    },
  }),
);

addDecorator(story => (
  <Provider store={store}>
    <div>{story()}</div>
    <GlobalStyle />
  </Provider>
));

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
