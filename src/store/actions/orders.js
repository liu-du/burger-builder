import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHAGE_BURGER_START
});

export const purchaseBurgerSuccess = (id, orderData) => ({
  type: actionTypes.PURCHAGE_BURGER_SUCCESS,
  orderId: id,
  orderData: orderData
});

export const purchaseBurgerFail = error => ({
  type: actionTypes.PURCHAGE_BURGER_FAIL,
  error: error
});

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());

    axios
      .post("/orders.json?auth=" + token, orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(err => {
        dispatch(purchaseBurgerFail(err));
      });
  };
};

export const purchaseInit = () => ({ type: actionTypes.PURCHASE_INIT });

export const fetchOrdersSucess = orders => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders: orders
});

export const fetchOrdersFail = err => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  error: err
});

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START
});

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("/orders.json" + queryParams)
      .then(response => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({
            ...response.data[key],
            id: key
          });
        }
        dispatch(fetchOrdersSucess(fetchedOrders));
      })
      .catch(err => {
        dispatch(fetchOrdersFail(err));
      });
  };
};
