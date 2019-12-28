import * as types from "../constants/ActionTypes";

export const increaseCounter = payload => ({
  type: types.API.increaseCounter
  //   payload
});

export const DecreaseCounter = payload => ({
  type: types.API.DecreaseCounter
  //   payload
});
export const IsLogged = () => ({
  type: types.API_LOGIN.login
});
export const AddFdList = payload => ({
  type: types.ADD_FD.addFd,
  payload
});
