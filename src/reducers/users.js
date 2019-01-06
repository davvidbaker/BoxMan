import { USER_ADD, USER_REMOVE } from '../actions';

function user({ username, preferences }) {
  return { username, preferences };
}

function users(state = [], action) {
  switch (action.type) {
    case USER_ADD:
      return [
        ...state.filter(u => u.username !== action.payload.username),
        user(action.payload),
      ];
    case USER_REMOVE:
      return state.filter(u => u.username !== action.payload.username);
    default:
      return state;
  }
}

export default users;
