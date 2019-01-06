import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';
import * as actionCreators from './actions';

export const sagaMiddleware = createSagaMiddleware();

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionCreators })
  : compose;

// Create a history of your choosing (we're using a browser history in this case)
// export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
// const middleware = routerMiddleware(history);
// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

function initializeStore(initialState) {
  // if (process.env.NODE_ENV === 'development') {
  const store = configureStore(initialState);
  // } else {
  //   store = configureStore(persistedState);
  // }

  // sagaMiddleware.run(rootSaga);

  return store;
}

export default initializeStore;
