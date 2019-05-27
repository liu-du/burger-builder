import { takeEvery, all } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga
} from "./auth";

import { initIngredientsSaga } from "./burgerBuilders";
import { purchaseBurgerSaga, fetchOrdersSaga } from "./orders";

export function* watchSaga() {
  yield all([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),

    takeEvery(actionTypes.FETCH_INGREDIENTS_START, initIngredientsSaga),

    takeEvery(actionTypes.PURCHAGE_BURGER, purchaseBurgerSaga),
    takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga)
  ]);
}
