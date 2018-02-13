import SimplePeer from 'simple-peer';
import { put, call, takeEvery, takeLatest, select } from 'redux-saga/effects';

import {
  RTC_ICE_SERVERS_FETCH,
  CAMERA_SELECT,
  CAMERAS_ENUMERATE,
  STREAM_CHANGE,
} from 'actions';
import getIceServers from './iceServers';
import { getStream, getCameras } from './cameras';

function* webrtc() {
  yield takeLatest(CAMERAS_ENUMERATE, getCameras);
  yield takeLatest(RTC_ICE_SERVERS_FETCH, getIceServers);

  yield takeLatest(CAMERA_SELECT, initiateRTC);
  // yield takeLatest(RTC_INITIALIZE, initiateRTC)
}

function* initiateRTC({ cameraInfo }) {
  console.log('cameraInfo', cameraInfo);
  const stream = yield call(getStream, cameraInfo);
  window.localStream = stream;
  yield put({ type: STREAM_CHANGE, localOrRemote: 'local' });

  const peers = select(state => state.peers);

  const { channelName, character } = yield select();

  var Peer = require('simple-peer');
  var p = new Peer({
    initiator: character === 'cameraGuy',
    trickle: false,
    channelName,
  });

  p.on('error', function(err) {
    console.log('error', err);
  });

  p.on('signal', function(data) {
    console.log('signal data', data);
    console.log('SIGNAL', JSON.stringify(data));
    // document.querySelector('#outgoing').textContent = JSON.stringify(data);
  });

  document.querySelector('form').addEventListener('submit', function(ev) {
    ev.preventDefault();
    p.signal(JSON.parse(document.querySelector('#incoming').value));
  });

  p.on('connect', function() {
    console.log('CONNECT');
    p.send('whatever' + Math.random());
  });

  p.on('data', function(data) {
    console.log('data: ' + data);
  });
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
}

export default webrtc;
