import {
  put,
  call,
  takeEvery,
  takeLatest,
  select,
  all,
} from 'redux-saga/effects';

import { SIGNAL_SERVER_CONNECT } from 'actions';

function* signalServer() {
  yield takeLatest(SIGNAL_SERVER_CONNECT, connectToSignalServer);
}

function* connectToSignalServer() {
  const socket = new WebSocket('ws://localhost:8080');
  console.log('socket', socket);
  // Connection opened
  socket.addEventListener('open', function(event) {
    console.log('socket opened');
    socket.send('Hello Server!');
    socket.send('Whatup');
  });

  // Listen for messages
  socket.addEventListener('message', function(event) {
    console.log('Message from server ', event.data);
  });

  socket.addEventListener('close', evt => {
    console.log('websocket close event', evt);
    /** 🔮 do something */
  });

  socket.addEventListener('error', e => {
    console.error('websocket error', e);
    /** 🔮 do something */
  });
}

export default signalServer;
