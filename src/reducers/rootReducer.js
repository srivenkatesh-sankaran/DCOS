import appReducer from './appReducers';
import serverReducer from './serverReducers';

const rootReducer = {
  appState: appReducer,
  serverState: serverReducer,
};

export default rootReducer;
