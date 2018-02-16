import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware, push } from 'react-router-redux';

import { saveState, loadState } from './utilities/localStorage';
import rootReducer from './reducers';
import rootSaga from './sagas';
import * as actionCreators from './actions';

export const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionCreators })
  : compose;

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);
// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

const configureStore = preloadedState =>
  createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(middleware, sagaMiddleware))
  );

let store;

const persistedState = loadState();

// if (process.env.NODE_ENV === 'development') {
store = configureStore(persistedState);
// } else {
//   store = configureStore(persistedState);
// }

sagaMiddleware.run(rootSaga);

/** 🔮 Maybe don't save the entire state and maybe don't do it on every action */
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
