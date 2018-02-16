import SimplePeer from 'simple-peer';
import {
  put,
  call,
  takeEvery,
  takeLatest,
  select,
  take,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import {
  RTC_ICE_SERVERS_FETCH,
  CAMERA_SELECT,
  CAMERAS_ENUMERATE,
  STREAM_CHANGE,
  RTC_INITIATE,
} from '../actions';
import getIceServers from './iceServers';
import { getStream, getCameras } from './cameras';

function* webrtc(sagaChannel) {
  yield takeLatest(CAMERAS_ENUMERATE, getCameras);
  yield takeLatest(RTC_ICE_SERVERS_FETCH, getIceServers);
  yield takeLatest([CAMERA_SELECT, RTC_INITIATE], initiateRTC, sagaChannel);
}

/** 💁
 * from redux-saga docs:
 * takeLatest will add the incoming action to the argument list (i.e. the action will be the last argument provided to saga)
 */
function* initiateRTC(sagaChannel, { cameraInfo }) {
  try {
    if (!cameraInfo) {
      cameraInfo = yield select(state => state.camera.selectedCamera);
      if (!cameraInfo) {
        throw new Error('no camera info!');
      }
    }
  } catch (e) {
    console.error('NO CAMERAINFO', e);
  }

  console.log('cameraInfo', cameraInfo);
  console.log('sagaChannel', sagaChannel);
  const stream = yield call(getStream, cameraInfo);
  window.localStream = stream;
  yield put({ type: STREAM_CHANGE, localOrRemote: 'local' });

  const peers = select(state => state.peers);

  const { channelName, character } = yield select();

  const peer = yield call(createPeer, { stream, character, channelName });

  const peerEventChannel = yield call(createPeerEventChannel, peer);

  console.log(
    "beware ⚠️, console logs may be swallowed! You probably won't see this in the console."
  );

  yield takeEvery('SOCKET_MESSAGE_RECEIVED', function*({ data }) {
    if (data.type === 'offer' || data.type === 'answer' || data.candidate) {
      peer.signal(data);
    } else if (data.type === 'rebound') {
      /** 🔮 Do something like set a websocket server validated flag to true or timestamp of last validation or something,, since this means we know the wss is responsding to us*/
    } else {
      console.warn(
        'unexpected data in received socket message',
        data.type,
        data
      );
    }
  });

  while (true) {
    const myAction = yield take(peerEventChannel);
    yield put(sagaChannel, myAction);
  }
}

function createPeerEventChannel(peer) {
  return eventChannel(emit => {
    peer.on('signal', data => {
      emit({
        type: `PEER_SIGNAL_${
          data.type
            ? data.type.toUpperCase()
            : data.candidate ? 'CANDIDATE' : 'OTHER'
        }`,
        data,
      });
    });

    peer.on('error', e => {
      emit({ type: 'PEER_ERROR', e });
    });

    peer.on('connect', function() {
      console.log('CONNECT');
      emit({ type: 'PEER_CONNECT' });
      peer.send('whatever' + Math.random());
    });

    peer.on('data', function(data) {
      emit({ type: 'PEER_DATA' });
      console.log('data: ' + data);
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

function createPeer({ stream, character, channelName }) {
  const p = new SimplePeer({
    initiator: character === 'cameraGuy',
    // trickle: false,
    channelName,
    stream,
  });
  return p;
}
// // // // // // // // // // // // // // // // // // // // // // // // //
/*   var peer1 = new SimplePeer({ initiator: true, stream: stream, channelName });
  var peer2 = new SimplePeer();

  peer1.on('signal', function(data) {
    console.log('data', data);
    peer2.signal(data);
  });

  peer2.on('signal', function(data) {
    console.log('data', data);
    peer1.signal(data);
  });

  peer2.on('stream', function(stream) {
    // got remote video stream, now let's show it in a video
    console.log('got remote video stream', stream);

    var video = document.querySelector('video');
    video.src = window.URL.createObjectURL(stream);
    video.play();
  });
 */
// // // // // // // // // // // // // // // // // // // // // // // //

/** ⚠️ not sure if initiator should be set to true */
// const peer = new SimplePeer({
//   initiator: character === 'cameraGuy',
//   stream,
//   channelName,
// });

// peer.on('error', function(err) {
//   console.error('error', err);
// });

// peer.on('signal', function(data) {
//   console.log('SIGNAL', data);
//   peer.signal(data);
//   // document.querySelector('#outgoing').textContent = JSON.stringify(data);
// });

// peer.on('stream', function(stream) {
//   var video = document.createElement('video');
//   video.src = window.URL.createObjectURL(stream);
//   document.body.appendChild(video);
//   video.play();
// });

// // document.querySelector('form').addEventListener('submit', function(ev) {
// //   ev.preventDefault();
// //   peer.signal(JSON.parse(document.querySelector('#incoming').value));
// // });

// peer.on('connect', function() {
//   console.log('CONNECT');
//   peer.send('whatever' + Math.random());
// });

// peer.on('data', function(data) {
//   console.log('🤑🤑🤑🤑🤑🤑data: ' + data);
// });

// console.log('peer', peer);

export default webrtc;
