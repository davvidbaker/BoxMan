export const SELECT_CHARACTER = 'SELECT_CHARACTER';
export const TOGGLE_FX = 'TOGGLE_FX';
export const CHANGE_PHASE = 'CHANGE_PHASE';
export const CHANGE_GAMEROOM = 'CHANGE_GAMEROOM';
export const CHANGE_CAMERA = 'CHANGE_CAMERA';
export const CHANGE_CONSTRAINTS = 'CHANGE_CONSTRAINTS';
export const FOUND_CAMERA = 'FOUND_CAMERA';
export const INITIATE_RTC = 'INITIATE_RTC';
export const FETCH_ICE_SERVERS = 'FETCH_ICE_SERVERS';
export const GOT_ICE_SERVERS = 'GOT_ICE_SERVERS';
export const REAL_TIME_CONNECTION = 'REAL_TIME_CONNECTION';
export const ADDED_REMOTE_STREAM = 'ADDED_REMOTE_STREAM';
export const REMOVED_REMOTE_STREAM = 'REMOVED_REMOTE_STREAM';
// export const CHANGE_VIEWPORT_STREAM = 'CHANGE_VIEWPORT_STREAM';
export const REMOVE_VIDEO = 'REMOVE_VIDEO';

export const selectCharacter = character => ({
  type: SELECT_CHARACTER,
  character,
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

export const changeCamera = cameraInfo => ({
  type: CHANGE_CAMERA,
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
  type: INITIATE_RTC,
});

// TODO if I want to make it more secure, pass in a string for the ice servers here maybe.
export const fetchIceServers = () => ({
  type: FETCH_ICE_SERVERS,
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

// export const changeViewportStream = () => {
//   return {
//     type: CHANGE_VIEWPORT_STREAM,
//   };
// };
