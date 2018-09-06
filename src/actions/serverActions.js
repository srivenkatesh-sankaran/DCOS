export const ADD_SERVER = 'ADD_SERVER';
export const ADD_SERVER_SUCCEEDED = 'ADD_SERVER_SUCCEEDED';
export const DESTROY_SERVER = 'DESTROY_SERVER';
export const DESTROY_SERVER_SUCCEEDED = 'DESTROY_SERVER_SUCCEEDED';

export function addServer() {
  return ({
    type: ADD_SERVER,
  });
}

export function addServerSucceeded() {
  return ({
    type: ADD_SERVER_SUCCEEDED,
  });
}

export function destroyServer() {
  return ({
    type: DESTROY_SERVER,
  });
}

export function destroyServerSucceeded() {
  return ({
    type: DESTROY_SERVER_SUCCEEDED,
  });
}
