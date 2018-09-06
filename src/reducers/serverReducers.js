import {
  ADD_SERVER,
  ADD_SERVER_SUCCEEDED,
  DESTROY_SERVER,
  DESTROY_SERVER_SUCCEEDED,
} from '../actions/serverActions';

const serverReducer = (state = {
}, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case ADD_SERVER:
      newState.addServer = true;
      newState.destroyServer = false;
      return newState;
    case ADD_SERVER_SUCCEEDED:
      newState.addServer = false;
      newState.destroyServer = false;
      return newState;
    case DESTROY_SERVER:
      newState.addServer = false;
      newState.destroyServer = true;
      return newState;
    case DESTROY_SERVER_SUCCEEDED:
      newState.addServer = false;
      newState.destroyServer = false;
      return newState;
    default:
      return state;
  }
};

export default serverReducer;
