import * as React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '../components/GlobalStyle';
import { saveState, loadState } from '../utilities/localStorage';

import Application from '../components/Application';
import initializeStore from '../store';

const store = initializeStore(loadState());

/** 🔮 Maybe don't save the entire state and maybe don't do it on every action */
store.subscribe(() => {
  saveState(store.getState());
});

const theme = {};

const Root = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <>
        <Application />
        <GlobalStyle />
      </>
    </ThemeProvider>
  </Provider>
);

Root.propTypes = {};

export default Root;
