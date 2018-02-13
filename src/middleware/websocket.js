import * as actions from '../actions';

const createWebsocketMiddleware = () => {
  let websocket;

  return store => next => action => {
    if (typeof action.then !== 'function') {
      return next(action);
    }

    return Promise.resolve(action).then(store.dispatch);
  };
};
export default createWebsocketMiddleware;
