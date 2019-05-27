import axios from "axios";
import { put, delay, call } from "redux-saga/effects";
import * as actionCreators from "../actions";

export function* logoutSaga(action) {
  yield call([localStorage, "removeItem"], "token");
  yield call([localStorage, "removeItem"], "userId");
  yield call([localStorage, "removeItem"], "expirationDate");
  // localStorage.removeItem("token");
  // localStorage.removeItem("userId");
  // localStorage.removeItem("expirationDate");
  yield put(actionCreators.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime);
  yield put(actionCreators.logout());
}

export function* authUserSaga(action) {
  yield put(actionCreators.authStart());
  // yield put(actionCreators.authUser(action.email, action.password))
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };
  const url = action.isSignup
    ? "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAhoh__WbwXsZMWWvXunIaDuWcD9PwjVLE"
    : "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAhoh__WbwXsZMWWvXunIaDuWcD9PwjVLE";

  try {
    const resp = yield axios.post(url, authData);
    localStorage.setItem("token", resp.data.idToken);
    localStorage.setItem("userId", resp.data.localId);
    localStorage.setItem(
      "expirationDate",
      new Date(new Date().getTime() + resp.data.expiresIn * 1000)
    );
    yield put(actionCreators.authSuccess(resp.data.idToken, resp.data.localId));
    yield put(actionCreators.checkAuthTimeout(resp.data.expiresIn * 1000));
  } catch (err) {
    yield put(actionCreators.authFail(err.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = localStorage.getItem("token");
  if (!token) {
    yield put(actionCreators.logout());
  } else {
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    if (new Date() > expirationDate) {
      yield put(actionCreators.logout());
    } else {
      const userId = localStorage.getItem("userId");
      yield put(actionCreators.authSuccess(token, userId));
      yield put(actionCreators.checkAuthTimeout(expirationDate - new Date()));
    }
  }
}
