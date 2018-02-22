// @flow
import { call, all } from 'redux-saga/effects';
import { channel } from 'redux-saga';

import type { Channel, Saga } from 'redux-saga';

import webrtc from './webrtc';
import websocket from './websocket';

export default function* rootSaga(): Saga<void> {
  // channel for communicating between websocket and webrtc sagas
  const sagaChannel: Channel = yield call(channel);
  yield all([websocket(sagaChannel), webrtc(sagaChannel)]);
}
