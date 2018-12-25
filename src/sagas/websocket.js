// @flow
import { put, call, takeEvery, takeLatest, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import { SIGNAL_SERVER_CONNECT, STREAM_CHANGE } from '../actions';
import config from '../config';

console.log('config', config);

function createSocketEventChannel(socket, character) {
  return eventChannel(emit => {
    socket.addEventListener('open', event => {
      socket.send(JSON.stringify({ type: 'newCharacter', character }));
      emit({ type: 'SOCKET_OPEN', event });
    }); // Listen for messages // 🤯 use flow typing! at least occasionally
    socket.addEventListener('message', event => {
      try {
        const data = JSON.parse(event.data);
        emit({
          type: 'SOCKET_MESSAGE_RECEIVED',
          data,
        });
      } catch (e) {
        emit({
          type: 'SOCKET_MESSAGE_RECEIVED_ERROR',
          data: e,
        });
        console.error(e);
      } // debugger;
    });
    socket.addEventListener('close', evt => {
      console.log('websocket close event', evt);
      emit({
        type: 'SOCKET_CLOSE',
        evt,
      }); /** 🔮 do something */
    });
    socket.addEventListener('error', e => {
      console.error('websocket error', e);
      console.log('e.target.url', e.target.url);
      window.open(e.target.url.replace('wss', 'https'));
      emit({
        type: 'SOCKET_ERROR',

        e,
      }); /** 🔮 do something */
    }); // the subscriber must return an unsubscribe function // this will be invoked when the saga calls `channel.close` method
    const unsubscribe = () => {
      /** 🔮  */
      // emit(unsubscribe stuff)
    };
    return unsubscribe;
  });
}

function* connectToSignalServer(sagaChannel) {
  const socket = new WebSocket(`wss://${config.SOCKET_SERVER_ADDRESS}:443`);
  const character = yield select(state => state.character);

  const socketEventChannel = yield call(
    createSocketEventChannel,
    socket,
    character,
  );
  yield takeEvery(socketEventChannel, function* everythingOnSocketEventChannel(action, ) {
    yield put(sagaChannel, action);
  }); //  THIS IS THE SAGA CHANNEL SUBSCRIPTION KINDA
  yield takeEvery(sagaChannel, function* everythingOnSagaChannel(action) {
    switch (action.type) {
      case 'PEER_SIGNAL_OFFER':
      case 'PEER_SIGNAL_ANSWER':
      case 'PEER_SIGNAL_CANDIDATE':
        socket.send(JSON.stringify(action.data));
        break;
      case 'PEER_STREAM':
      case 'PEER_DATA':
        console.log('stream_change');
        yield put({ type: STREAM_CHANGE, localOrRemote: 'remote' });
        break;
      case 'SOCKET_MESSAGE_RECEIVED':
        yield put(action);
        break;
      default:
        yield put(action); // socket.send(JSON.stringify(action.data));
    }
  });
}

function* websocket(sagaChannel) {
  const socket = yield takeLatest(
    SIGNAL_SERVER_CONNECT,
    connectToSignalServer,
    sagaChannel,
  );
}

export default websocket;
