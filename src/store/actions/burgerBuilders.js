import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = ingredientName => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientName: ingredientName
});

export const removeIngredient = ingredientName => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredientName: ingredientName
});

export const fetchIngredientsSuccess = ingredients => ({
  type: actionTypes.FETCH_INGREDIENTS_SUCCESS,
  ingredients: ingredients
});

export const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED
});

export const initIngredients = () => {
  return dispatch => {
    axios
      .get("https://react-my-burger-216df.firebaseio.com/ingredients.json")
      .then(response => dispatch(fetchIngredientsSuccess(response.data)))
      .catch(_ => dispatch(fetchIngredientsFailed()));
  };
};
