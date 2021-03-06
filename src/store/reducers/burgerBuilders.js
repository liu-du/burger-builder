import * as actionTypes from "../actions/actionTypes";
const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 1,
  cheese: 0.5,
  meat: 2
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        building: true,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };

    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        building: true,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      };

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return { ...state, error: true, building: false };

    case actionTypes.FETCH_INGREDIENTS_SUCCESS:
      return {
        ...state,
        building: false,
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false
      };

    default:
      return state;
  }
};

export default reducer;
