import { put } from "redux-saga/effects";
import axios from "../../axios-orders";
import * as actionCreators from "../actions/orders";

export function* purchaseBurgerSaga(action) {
  yield put(actionCreators.purchaseBurgerStart());
  try {
    const response = yield axios.post(
      "/orders.json?auth=" + action.token,
      action.orderData
    );
    yield put(
      actionCreators.purchaseBurgerSuccess(response.data.name, action.orderData)
    );
  } catch (err) {
    console.log(err);
    yield put(actionCreators.purchaseBurgerFail(err));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actionCreators.fetchOrdersStart());
  const queryParams =
    "?auth=" +
    action.token +
    '&orderBy="userId"&equalTo="' +
    action.userId +
    '"';

  try {
    const response = yield axios.get("/orders.json" + queryParams);
    const fetchedOrders = [];
    for (let key in response.data) {
      fetchedOrders.push({
        ...response.data[key],
        id: key
      });
    }
    yield put(actionCreators.fetchOrdersSucess(fetchedOrders));
  } catch (err) {
    yield put(actionCreators.fetchOrdersFail(err));
  }
}
