import SimplePeer from 'simple-peer';
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

// weird that eslint wants this stuff down here
import {
  put,
  call,
  takeEvery,
  takeLatest,
  select,
  take,
} from 'redux-saga/effects';

window.peers = [];

function createP2PEventChannel(peer, currentUser) {
  return eventChannel(emit => {
    peer.on('signal', data => {
      console.log('🔥  on signal', data);
      peer.signal(data);

      emit({
        type: `PEER_SIGNAL_${
          data.type
            ? data.type.toUpperCase()
            : data.candidate
              ? 'CANDIDATE'
              : 'OTHER'
        }`,
        data,
      });
    });

    peer.on('error', e => {
      emit({ type: 'PEER_ERROR', e });
    });

    peer.on('connect', () => {
      console.log('CONNECT');
      emit({ type: 'PEER_CONNECT' });
      peer.send(`you successfully connected to me, ${currentUser}`);
    });

    peer.on('data', data => {
      emit({ type: 'PEER_DATA' });
      console.log(`data: ${data}`);
    });

    peer.on('stream', stream => {
      emit({ type: 'PEER_STREAM' });
      console.log(`stream: ${stream}`);
      window.remoteStreams = [stream, ...window.remoteStreams];
      console.log('window.remoteStreams', window.remoteStreams);
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

/** 💁
 * from redux-saga docs:
 * takeLatest will add the incoming action to the argument list (i.e. the action will be the last argument provided to saga)
 */
function* initiateRTC(sagaChannel, { cameraInfo }) {
  try {
    if (!cameraInfo) {
      // eslint-disable-next-line no-param-reassign
      cameraInfo = yield select(state => state.camera.selectedCamera);
      if (!cameraInfo) {
        throw new Error('no camera info!');
      }
    }
  } catch (e) {
    console.error('NO CAMERAINFO', e);
  }

  const stream = yield call(getStream, cameraInfo);
  window.localStream = window.localStream || stream;
  window.remoteStreams = window.remoteStreams || [];

  yield put({ type: STREAM_CHANGE, localOrRemote: 'local' });

  const { currentUser = 'no user selected' } = yield select(state => state);

  yield takeEvery('SOCKET_MESSAGE_RECEIVED', ({ data }) => {
    console.log('SOCKET_MESSAGE_RECEIVED:  data', data);
    if (data.type === 'offer') {
      console.log('🔥  data.type', data.type);
      const peer = new SimplePeer({
        initiator: false,
        // trickle: false,
        stream,
      });

      const peerEventChannel = call(createP2PEventChannel, peer, currentUser);

      window.peers = [...window.peers, peer];

      peer.signal(data);

      // while (true) {
      //   const action = yield take(peerEventChannel);
      //   yield put(sagaChannel, action);
      // }
    } else if (data.type === 'answer' || data.candidate) {
      window.peers.forEach(peer => {
        peer.signal(data);
      });
    } else if (data.type === 'rebound') {
      /** 🔮 Do something like set a websocket server validated flag to true or timestamp of last validation or something,, since this means we know the wss is responsding to us */
    } else if (data.type === 'peer lost') {
      console.log(
        ' a peer has been lost, and we need to do something about it',
        data,
      );
    } else if (data.type === 'new member') {
      const peer = new SimplePeer({
        initiator: true,
        // trickle: false,
        stream,
      });

      console.log('🔥  I am initiating an offer');

      const peerEventChannel = createP2PEventChannel(peer, currentUser);
      window.peers = [...window.peers, peer];
    } else {
      console.warn(
        'unexpected data in received socket message',
        data.type,
        data,
      );
    }
  });
}

function* webrtc(sagaChannel) {
  yield takeLatest(CAMERAS_ENUMERATE, getCameras);
  yield takeLatest(RTC_ICE_SERVERS_FETCH, getIceServers);
  yield takeLatest([CAMERA_SELECT, RTC_INITIATE], initiateRTC, sagaChannel);
}

export default webrtc;
