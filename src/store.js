import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import websocketMiddleware from './middleware/websocket';
import rootReducer from 'reducers';
import rootSaga from 'sagas';
import * as actionCreators from 'actions';

export const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionCreators })
  : compose;

const vanillaPromise = store => next => action => {
  if (typeof action.then !== 'function') {
    return next(action);
  }

  return Promise.resolve(action).then(store.dispatch);
};

const configureStore = preloadedState =>
  createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

let store;
if (process.env.NODE_ENV === 'development') {
  store = configureStore({});
} else {
  store = configureStore({});
}

sagaMiddleware.run(rootSaga);

export default store;
