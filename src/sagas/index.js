import {
  put,
  call,
  takeEvery,
  takeLatest,
  select,
  all,
} from 'redux-saga/effects';

import store from 'store';
import {
  RTC_INITIALIZE,
  CHANGE_GAMEROOM,
  CHANGE_PHASE,
  FETCH_ICE_SERVERS,
  GOT_ICE_SERVERS,
  REAL_TIME_CONNECTION,
  addedRemoteStream,
  removedRemoteStream,
  receivedMessage,
} from 'actions';
import webrtc from './webrtc';

function* getIceServers() {
  const state = yield select();
  let conf;
  console.log('shitconnecting to XirSys...');

  // debugger;
  // TODO I know including the secret here isn't super secure, but it's a free stun and turn server so whatevs
  const iceServers = yield fetch(
    'https://service.xirsys.com/ice?ident=brainsandspace&secret=09f8d0aa-7940-11e5-8514-a68d4d023276&domain=www.brainsandspace.com&application=default&room=default&secure=1'
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      // debugger;
      console.log('...connected to XirSys', data.d);
      return data.d;
    })
    .catch(err => {
      console.error(err);
    });
  // data.d is where the ICE servers object lives
  yield put({ type: GOT_ICE_SERVERS, iceServers: iceServers.iceServers });
}

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
  yield takeLatest(FETCH_ICE_SERVERS, getIceServers);
  yield takeLatest(RTC_INITIALIZE, initiateRTC);
}

export default function* rootSaga() {
  yield all([webrtc()]);
}
