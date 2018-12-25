// @flow
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

function createPeerEventChannel(peer) {
  return eventChannel(emit => {
    peer.on('signal', data => {
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
      peer.send(`whatever${Math.random()}`);
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
  console.log('initiating RTC with cameraInfo', cameraInfo);

  const stream = yield call(getStream, cameraInfo);
  window.localStream = window.localStream || stream;
  window.remoteStreams = window.remoteStreams || [];

  yield put({ type: STREAM_CHANGE, localOrRemote: 'local' });

  const peers = select(state => state.peers);

  const { channelName, character } = yield select(state => state);

  const peer = yield call(createPeer, {
    stream,
    character,
    channelName: `${channelName}-boxman`, // appending boxman for uniquer name
  });
  console.log('peer', peer);

  const peerEventChannel = yield call(createPeerEventChannel, peer);

  yield takeEvery('SOCKET_MESSAGE_RECEIVED', ({ data }) => {
    if (data.type === 'offer' || data.type === 'answer' || data.candidate) {
      peer.signal(data);
    } else if (data.type === 'rebound') {
      /** 🔮 Do something like set a websocket server validated flag to true or timestamp of last validation or something,, since this means we know the wss is responsding to us */
    } else {
      console.warn(
        'unexpected data in received socket message',
        data.type,
        data,
      );
    }
  });

  while (true) {
    const myAction = yield take(peerEventChannel);
    console.log('taken myAction', myAction);
    yield put(sagaChannel, myAction);
  }
}

function createPeer({ stream, character, channelName }) {
  const p = new SimplePeer({
    initiator: character === 'cameraguy',
    // trickle: false,
    channelName,
    stream,
  });
  return p;
}

function* webrtc(sagaChannel) {
  yield takeLatest(CAMERAS_ENUMERATE, getCameras);
  yield takeLatest(RTC_ICE_SERVERS_FETCH, getIceServers);
  yield takeLatest([CAMERA_SELECT, RTC_INITIATE], initiateRTC, sagaChannel);
}

export default webrtc;
