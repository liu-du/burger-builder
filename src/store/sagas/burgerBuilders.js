import axios from "axios";
import { put } from "redux-saga/effects";
import * as actionCreators from "../actions";

export function* initIngredientsSaga(action) {
  try {
    const response = yield axios.get(
      "https://react-my-burger-216df.firebaseio.com/ingredients.json"
    );
    yield put(actionCreators.fetchIngredientsSuccess(response.data));
  } catch (error) {
    yield put(actionCreators.fetchIngredientsFailed());
  }
}
