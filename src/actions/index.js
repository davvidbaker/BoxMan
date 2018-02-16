export const CHARACTER_SELECT = 'CHARACTER_SELECT';
export const TOGGLE_FX = 'TOGGLE_FX';
export const CHANGE_PHASE = 'CHANGE_PHASE';
export const CHANNEL_NAME_CHANGE = 'CHANNEL_NAME_CHANGE';
export const CHANGE_CONSTRAINTS = 'CHANGE_CONSTRAINTS';

export const CAMERA_SELECT = 'CAMERA_SELECT';
export const CAMERAS_ENUMERATE = 'CAMERAS_ENUMERATE';
export const CAMERA_FOUND = 'CAMERA_FOUND';

export const RTC_INITIATE = 'RTC_INITIATE';
export const RTC_ICE_SERVERS_FETCH = 'RTC_ICE_SERVERS_FETCH';
export const RTC_ICE_SERVERS_GOT = 'RTC_ICE_SERVERS_GOT';
export const REAL_TIME_CONNECTION = 'REAL_TIME_CONNECTION';
export const ADDED_REMOTE_STREAM = 'ADDED_REMOTE_STREAM';
export const REMOVED_REMOTE_STREAM = 'REMOVED_REMOTE_STREAM';
// export const CHANGE_VIEWPORT_STREAM = 'CHANGE_VIEWPORT_STREAM';
export const RECEIVED_MESSAGE = 'RECEIVED_MESSAGE';
export const STREAM_CHANGE = 'STREAM_CHANGE';

export const SIGNAL_SERVER_CONNECT = 'SIGNAL_SERVER_CONNECT';

export const connectToSignalServer = () => ({
  type: SIGNAL_SERVER_CONNECT,
});

export const selectCharacter = character => ({
  type: CHARACTER_SELECT,
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
  type: CHANNEL_NAME_CHANGE,
  room,
});

export const selectCamera = cameraInfo => ({
  type: CAMERA_SELECT,
  cameraInfo,
});

export const foundCamera = cameraInfo => ({
  type: CAMERA_FOUND,
  cameraInfo,
});

// getUserMedia constraints
export const changeConstraints = constraints => ({
  type: CHANGE_CONSTRAINTS,
  constraints,
});

export const initiateRTC = () => ({
  type: RTC_INITIATE,
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

export const clear = () => {
  return {
    type: 'CLEAR',
  };
};

// export const changeViewportStream = () => {
//   return {
//     type: CHANGE_VIEWPORT_STREAM,
//   };
// };
