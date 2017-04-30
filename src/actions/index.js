export const SELECT_CHARACTER = 'SELECT_CHARACTER';
export const TOGGLE_FX = 'TOGGLE_FX';
export const CHANGE_PHASE = 'CHANGE_PHASE';
export const CHANGE_GAMEROOM = 'CHANGE_GAMEROOM';
export const CHANGE_CAMERA = 'CHANGE_CAMERA';
export const CHANGE_CONSTRAINTS = 'CHANGE_CONSTRAINTS';
export const FOUND_CAMERA = 'FOUND_CAMERA';

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
  constraints
})

export function actionOne() {}
