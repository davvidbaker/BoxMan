// @flow
// 👆 is this thing on
import {
  put,
  call,
  take,
  takeEvery,
  takeLatest,
  select,
  all,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import { SIGNAL_SERVER_CONNECT } from '../actions';

function* websocket(sagaChannel) {
  const socket = yield takeLatest(
    SIGNAL_SERVER_CONNECT,
    connectToSignalServer,
    sagaChannel
  );
}

function* connectToSignalServer(sagaChannel) {
  const socket = new WebSocket('ws://localhost:8080');

  const socketEventChannel = yield call(createSocketEventChannel, socket);

  yield takeEvery(socketEventChannel, function*(action) {
    yield put(sagaChannel, action);
  });

  //  THIS IS THE SAGA CHANNEL SUBSCRIPTION KINDA
  yield takeEvery(sagaChannel, function*(action) {
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
        yield put(action);

      // socket.send(JSON.stringify(action.data));
    }
  });
}

function createSocketEventChannel(socket) {
  return eventChannel(emit => {
    socket.addEventListener('open', function(event) {
      socket.send(JSON.stringify({ message: 'Hello Server!' }));
      emit({ type: 'SOCKET_OPEN', event });
    });

    // Listen for messages
    // 🤯 use flow typing! at least occasionally
    socket.addEventListener('message', function(event: MessageEvent) {
      !event.data.substring(0, 40).includes('rebound') &&
        console.log(`Message from server ${event.data.substring(0, 40)}`);
      try {
        const data = JSON.parse(event.data);
        emit({ type: 'SOCKET_MESSAGE_RECEIVED', data });
      } catch (e) {
        emit({ type: 'SOCKET_MESSAGE_RECEIVED_ERROR', data: event.data });
        console.error(e);
      }
      // debugger;
    });

    socket.addEventListener('close', evt => {
      console.log('websocket close event', evt);
      emit({ type: 'SOCKET_CLOSE', evt });
      /** 🔮 do something */
    });

    socket.addEventListener('error', e => {
      console.error('websocket error', e);
      emit({ type: 'SOCKET_ERROR', e });

      /** 🔮 do something */
    });

    // the subscriber must return an unsubscribe function
    // this will be invoked when the saga calls `channel.close` method
    const unsubscribe = () => {
      /** 🔮  */
      // emit(unsubscribe stuff)
    };

    return unsubscribe;
  });
}

export default websocket;
