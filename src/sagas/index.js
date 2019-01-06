import { channel } from 'redux-saga';

import webrtc from './webrtc';
import websocket from './websocket';

import { call, all } from 'redux-saga/effects';

export default function* rootSaga() {
  // channel for communicating between websocket and webrtc sagas
  const sagaChannel = yield call(channel);
  yield all([websocket(sagaChannel), webrtc(sagaChannel)]);
}
