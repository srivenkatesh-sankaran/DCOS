import {
  ADD_APP,
  DESTROY_APP,
} from '../actions/appActions';

const appReducer = (state = {
}, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case ADD_APP:
      newState.addApp = (state.addApp || 0) + 1;
      newState.appData = action.data;
      return newState;
    case DESTROY_APP:
      newState.deleteCode = action.data;
      newState.destroyApp = (state.destroyApp || 0) + 1;
      return newState;
    default:
      return state;
  }
};

export default appReducer;
