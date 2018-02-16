import {
  put,
  call,
  takeEvery,
  takeLatest,
  select,
  all,
} from 'redux-saga/effects';
import { channel } from 'redux-saga';

import store from '../store';
import {
  CHANNEL_NAME_CHANGE,
  CHANGE_PHASE,
  GOT_ICE_SERVERS,
  REAL_TIME_CONNECTION,
  addedRemoteStream,
  removedRemoteStream,
  receivedMessage,
} from '../actions';
import webrtc from './webrtc';
import websocket from './websocket';

/*
function* initiateRTC() {
  const state = yield select();

  const webrtc = new SimpleWebRTC({
    localVideoEl:
      state.character === 'cameraGuy'
        ? document.getElementById('video-viewfinder')
        : null, //document.getElementById('hidden-video'),
    autoRequestMedia: true, //config.character === 'cameraGuy' ? true : false,
    media: state.constraints,
    peerConnectionConfig: state.iceServers,
  });

  //
  // window.webrtc = webrtc;

  webrtc.on('readyToCall', () => {
    webrtc.joinRoom(state.gameroom, (err, roomDescription) => {
      if (err) console.error(err);
      console.log('roomDescription: ', roomDescription);
    });
  });

  if (state.character === 'boxMan') {
    webrtc.on('videoAdded', (videoEl, peer) => {
      // can't manage streams with redux
      window.remoteStreams = window.remoteStreams ? window.remoteStreams : [];
      window.remoteStreams.push(videoEl.srcObject);

      // this is how I am getting around the fact that I can't 'put' in here
      // this will cause a prop of Application to change, so we can pick up on the new stream
      store.dispatch(addedRemoteStream());
    });

    webrtc.on('videoRemoved', (videoEl, peer) => {
      // this.props.removedVideo(videoEl.srcObject);
      const oldStream = videoEl.srcObject;
      for (let i = 0; i < window.remoteStreams.length; i++) {
        if (window.remoteStreams[i].id === oldStream.id) {
          window.remoteStreams.splice(i, 1);
          store.dispatch(removedRemoteStream());
          break;
        }
      }
    });
  }

  // for some reason, I couldn't figure out how to get webrtc.sendToAll to work (via sockets), so I ended up using the P2P data channel
  webrtc.on('channelMessage', (peer, channel, data) => {
    console.log('channelMessage', peer, channel, data);
    if (data.type === 'chat') {
      console.log('incoming message:', data.payload);
      store.dispatch(receivedMessage(data.payload));
    }
  });

  yield put({ type: REAL_TIME_CONNECTION, webrtc });
}

function* rtcSaga() {
  yield takeLatest(RTC_INITIALIZE, initiateRTC);
}
*/

export default function* rootSaga() {
  // channel for communicating between websocket and webrtc sagas
  const sagaChannel = yield call(channel);
  console.log('channel', sagaChannel);
  // yield takeEvery(sagaChannel, function*(action) {
  //   yield put({
  //     ...action,
  //     type: `${action.type}_taken_from_saga_channel`,
  //   });
  // });
  yield all([websocket(sagaChannel), webrtc(sagaChannel)]);
}
