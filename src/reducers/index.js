import { combineReducers } from 'redux';
import uniqBy from 'lodash/fp/uniqBy';

import users from './users';
import * as ActionTypes from '../actions';

const role = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.ROLE_SELECT:
      return action.payload.role;
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

const phase = (state = 'roleSelect', action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_PHASE:
      return action.phase;
    case 'CLEAR':
      return 'roleSelect';
    default:
      return state;
  }
};

const partyName = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.PARTY_NAME_CHANGE:
      return `${action.room}`;
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
      return uniqBy(({ deviceId }) => deviceId)([...state, action.cameraInfo]);

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
  action,
) => {
  switch (action.type) {
    case ActionTypes.STREAM_CHANGE:
      return {
        ...state,
        flag: !state.flag,
        localOrRemote: action.localOrRemote,
      };
    case 'CLEAR':
      return { flag: false, localOrRemote: 'local' };
    default:
      return state;
  }
};

function currentUser(state = null, action) {
  switch (action.type) {
    case ActionTypes.USER_ADD:
      return action.payload.username;
    /* ⚠️ todo a way to select a user lol */
    default:
      return state;
  }
}

const iState = { 'no cameras available': false };
function seriousProblems(state = iState, action) {
  switch (action.type) {
    case 'NO_CAMERAS_AVAILABLE':
      return { ...state, 'no cameras available': true };

    case ActionTypes.CAMERA_FOUND:
      return { ...state, 'no cameras available': false };

    case 'CLEAR':
      return iState;
    default:
      return state;
  }
}

const appReducer = combineReducers({
  phase,
  role,
  fxMode,
  partyName,
  camera,
  constraints,
  iceServers,
  realTimeConnection,
  messageFromPeer,
  streamChange,
  users,
  currentUser,
  seriousProblems,
  // router: routerReducer
});

const rootReducer = (state, action) => appReducer(action.type === ActionTypes.RESET ? undefined : state, action);

export default rootReducer;
