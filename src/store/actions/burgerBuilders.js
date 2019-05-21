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

export const setIngredients = ingredients => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients: ingredients
});

export const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED
});

export const initIngredients = () => {
  return dispatch => {
    axios
      .get("https://react-my-burger-216df.firebaseio.com/ingredients.json")
      .then(response => dispatch(setIngredients(response.data)))
      .catch(_ => dispatch(fetchIngredientsFailed()));
  };
};
