import * as actionTypes from "./actionTypes";

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

export const purchaseBurger = (orderData, token) => ({
  type: actionTypes.PURCHAGE_BURGER,
  orderData: orderData,
  token: token
});

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT
});

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

export const fetchOrders = (token, userId) => ({
  type: actionTypes.FETCH_ORDERS,
  token: token,
  userId: userId
});
