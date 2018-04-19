import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import * as ActionTypes from '../actions';

const character = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.CHARACTER_SELECT:
      return action.character;
    case 'CLEAR':
      return null;
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
    case 'CLEAR':
      return 'characterSelect';
    default:
      return state;
  }
};

const channelName = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.CHANNEL_NAME_CHANGE:
      return `${action.room}-boxman`; // append boxman so channelName is more unique
    case 'CLEAR':
      return null;
    default:
      return state;
  }
};

const selectedCamera = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.CAMERA_SELECT:
      return action.cameraInfo;
    case 'CLEAR':
      return null;
    default:
      return state;
  }
};

const availableCameras = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.CAMERA_FOUND:
      return [...state, action.cameraInfo];
    case 'CLEAR':
      return [];
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
    case 'CLEAR':
      return null;
    default:
      return state;
  }
};

const realTimeConnection = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.REAL_TIME_CONNECTION:
      return action.webrtc;
    case 'CLEAR':
      return null;
    default:
      return state;
  }
};

// const remoteStreamsCount = (state = 0, action) => {
//   switch (action.type) {
//     case ActionTypes.ADDED_REMOTE_STREAM:
//       return window.remoteStreams.length;
//     case ActionTypes.REMOVED_REMOTE_STREAM:
//       return window.remoteStreams.length;
//     case 'CLEAR':
//       return 0;
//     default:
//       return state;
//   }
// };

const messageFromPeer = (state = { message: null }, action) => {
  switch (action.type) {
    case ActionTypes.RECEIVED_MESSAGE:
      return action.messageFromPeer;
    case 'CLEAR':
      return { message: null };
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
      return { ...state, flag: !state.flag, localOrRemote: action.localOrRemote };
    case 'CLEAR':
      return { flag: false, localOrRemote: 'local' };
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
  messageFromPeer,
  streamChange,
  router: routerReducer,
});

export default rootReducer;
