import { combineReducers } from 'redux';
import * as ActionTypes from '../actions';

const character = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.CHARACTER_SELECT:
      return action.character;
    default:
      return state;
  }
};

const fxMode = (state = false, action) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_FX:
      return action.checked;
    default:
      return state;
  }
};

const phase = (state = 'characterSelect', action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_PHASE:
      return action.phase;
    default:
      return state;
  }
};

const channelName = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.CHANNEL_NAME_CHANGE:
      return `${action.room}-boxman`; // append boxman so channelName is more unique
    default:
      return state;
  }
};

const selectedCamera = (state = null, action) => {
  console.log('action', action);
  switch (action.type) {
    case ActionTypes.CAMERA_SELECT:
      return action.cameraInfo;
    default:
      return state;
  }
};

const availableCameras = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.CAMERA_FOUND:
      return [...state, action.cameraInfo];
    default:
      return state;
  }
};

const camera = combineReducers({ selectedCamera, availableCameras });

const constraints = (state = { video: true, audio: false }, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_CONSTRAINTS:
      return action.constraints;
    default:
      return state;
  }
};

const iceServers = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.RTC_ICE_SERVERS_GOT:
      return action.iceServers;
    default:
      return state;
  }
};

const realTimeConnection = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.REAL_TIME_CONNECTION:
      return action.webrtc;
    default:
      return state;
  }
};

const remoteStreamsCount = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.ADDED_REMOTE_STREAM:
      return window.remoteStreams.length;
    case ActionTypes.REMOVED_REMOTE_STREAM:
      return window.remoteStreams.length;
    default:
      return state;
  }
};

const messageFromPeer = (state = { message: null }, action) => {
  switch (action.type) {
    case ActionTypes.RECEIVED_MESSAGE:
      return action.messageFromPeer;
    default:
      return state;
  }
};

/** 💁 this is basically just a flag that Application uses to check if window.stream has changed */
const streamChange = (
  state = { flag: false, localOrRemote: 'local' },
  action
) => {
  switch (action.type) {
    case ActionTypes.STREAM_CHANGE:
      return { ...state, flag: !state.flag };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  phase,
  character,
  fxMode,
  channelName,
  camera,
  constraints,
  iceServers,
  realTimeConnection,
  remoteStreamsCount,
  messageFromPeer,
  streamChange,
});

export default rootReducer;
