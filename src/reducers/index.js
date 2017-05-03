import { combineReducers } from 'redux';
import * as ActionTypes from 'actions';

const character = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.SELECT_CHARACTER:
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

const gameroom = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_GAMEROOM:
      return `${action.room}-boxman`; // append boxman so gameroom is more unique
    default:
      return state;
  }
};

const selectedCamera = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.SELECT_CAMERA:
      return action.cameraID;
    default:
      return state;
  }
};

const availableCameras = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.FOUND_CAMERA:
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
    case ActionTypes.GOT_ICE_SERVERS:
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
// const streams = combineReducers({ local, remote });

const rootReducer = combineReducers({
  phase,
  character,
  fxMode,
  gameroom,
  camera,
  constraints,
  iceServers,
  realTimeConnection,
  remoteStreamsCount,
  messageFromPeer,
});

export default rootReducer;
