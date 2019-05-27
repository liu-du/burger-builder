import * as actionTypes from "./actionTypes";

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path: path
});

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const authSuccess = (idToken, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken: idToken,
  userId: userId
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error: error
});

export const authUser = (email, password) => ({
  type: actionTypes.AUTH_USER,
  email: email,
  password: password
});

export const auth = (email, password, isSignup) => ({
  type: actionTypes.AUTH_USER,
  email: email,
  password: password,
  isSignup: isSignup
});

export const logout = () => ({ type: actionTypes.AUTH_INITIATE_LOGOUT });
export const logoutSucceed = () => ({ type: actionTypes.AUTH_LOGOUT });

export const checkAuthTimeout = expirationTime => ({
  type: actionTypes.AUTH_CHECK_TIMEOUT,
  expirationTime: expirationTime
});

export const authCheckState = () => ({
  type: actionTypes.AUTH_CHECK_STATE
});
