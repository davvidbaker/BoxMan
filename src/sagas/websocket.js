// @flow
import { put, call, takeEvery, takeLatest } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import type { Channel, Saga } from 'redux-saga';

import { SIGNAL_SERVER_CONNECT } from '../actions';
import config from '../config';

console.log('config', config);
function* websocket(sagaChannel: Channel): Saga<void> {
  const socket = yield takeLatest(
    SIGNAL_SERVER_CONNECT,
    connectToSignalServer,
    sagaChannel
  );
}

function createSocketEventChannel(socket: WebSocket) {
  return eventChannel(emit => {
    socket.addEventListener('open', event => {
      socket.send(JSON.stringify({ message: 'Hello Server!' }));
      emit({ type: 'SOCKET_OPEN', event });
    }); // Listen for messages // 🤯 use flow typing! at least occasionally
    socket.addEventListener('message', (ws, event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        emit({
          type: 'SOCKET_MESSAGE_RECEIVED',
          data
        });
      } catch (e) {
        emit({
          type: 'SOCKET_MESSAGE_RECEIVED_ERROR',
          data: event.data
        });
        console.error(e);
      } // debugger;
    });
    socket.addEventListener('close', evt => {
      console.log('websocket close event', evt);
      emit({
        type: 'SOCKET_CLOSE',
        evt
      }); /** 🔮 do something */
    });
    socket.addEventListener('error', e => {
      console.error('websocket error', e);
      emit({
        type: 'SOCKET_ERROR',

        e
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
  const socketEventChannel = yield call(createSocketEventChannel, socket);
  yield takeEvery(socketEventChannel, function* everythingOnSocketEventChannel(action) {
    yield put(sagaChannel, action);
  }); //  THIS IS THE SAGA CHANNEL SUBSCRIPTION KINDA
  yield takeEvery(sagaChannel, function* everythingOnSagaChannel(action) {
    switch (action.type) {
      case 'PEER_SIGNAL_OFFER':
      case 'PEER_SIGNAL_ANSWER':
      case 'PEER_SIGNAL_CANDIDATE':
        socket.send(JSON.stringify(action.data));
        break;
      case 'SOCKET_MESSAGE_RECEIVED':
        yield put(action);
        break;
      default:
        yield put(action); // socket.send(JSON.stringify(action.data));
    }
  });
}
export default websocket;
