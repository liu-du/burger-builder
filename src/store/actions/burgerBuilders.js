import * as actionTypes from "./actionTypes";

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

export const initIngredients = () => ({
  type: actionTypes.FETCH_INGREDIENTS_START
});
