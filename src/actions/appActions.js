export const ADD_APP = 'ADD_APP';
export const DESTROY_APP = 'DESTROY_APP';

export function addApp(data) {
  return ({
    type: ADD_APP,
    data,
  });
}

export function destroyApp(data) {
  return ({
    type: DESTROY_APP,
    data,
  });
}
