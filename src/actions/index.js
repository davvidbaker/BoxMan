export const SELECT_CHARACTER = 'SELECT_CHARACTER';
export const TOGGLE_FX = 'TOGGLE_FX';
export const CHANGE_PHASE = 'CHANGE_PHASE';
export const CHANGE_GAMEROOM = 'CHANGE_GAMEROOM';
export const CAMERA_SELECT = 'CAMERA_SELECT';
export const CAMERAS_ENUMERATE = 'CAMERAS_ENUMERATE';
export const CHANGE_CONSTRAINTS = 'CHANGE_CONSTRAINTS';
export const FOUND_CAMERA = 'FOUND_CAMERA';
export const RTC_INITIALIZE = 'RTC_INITIALIZE';
export const RTC_ICE_SERVERS_FETCH = 'RTC_ICE_SERVERS_FETCH';
export const RTC_ICE_SERVERS_GOT = 'RTC_ICE_SERVERS_GOT';
export const REAL_TIME_CONNECTION = 'REAL_TIME_CONNECTION';
export const ADDED_REMOTE_STREAM = 'ADDED_REMOTE_STREAM';
export const REMOVED_REMOTE_STREAM = 'REMOVED_REMOTE_STREAM';
// export const CHANGE_VIEWPORT_STREAM = 'CHANGE_VIEWPORT_STREAM';
export const RECEIVED_MESSAGE = 'RECEIVED_MESSAGE';
export const STREAM_CHANGE = 'STREAM_CHANGE';

export const selectCharacter = character => ({
  type: SELECT_CHARACTER,
  character,
});

export const enumerateCameras = () => ({
  type: CAMERAS_ENUMERATE,
});

export const toggleFX = checked => ({
  type: TOGGLE_FX,
  checked,
});

export const changePhase = phase => ({
  type: CHANGE_PHASE,
  phase,
});

export const changeGameroom = room => ({
  type: CHANGE_GAMEROOM,
  room,
});

export const selectCamera = cameraInfo => ({
  type: CAMERA_SELECT,
  cameraInfo,
});

export const foundCamera = cameraInfo => ({
  type: FOUND_CAMERA,
  cameraInfo,
});

// getUserMedia constraints
export const changeConstraints = constraints => ({
  type: CHANGE_CONSTRAINTS,
  constraints,
});

export const initiateRTC = () => ({
  type: RTC_INITIALIZE,
});

export const fetchIceServers = () => ({
  type: RTC_ICE_SERVERS_FETCH,
});

export const addedRemoteStream = () => {
  return {
    type: ADDED_REMOTE_STREAM,
  };
};

export const removedRemoteStream = () => {
  return {
    type: REMOVED_REMOTE_STREAM,
  };
};

export const receivedMessage = msg => {
  return {
    type: RECEIVED_MESSAGE,
    messageFromPeer: msg,
  };
};

// export const changeViewportStream = () => {
//   return {
//     type: CHANGE_VIEWPORT_STREAM,
//   };
// };
