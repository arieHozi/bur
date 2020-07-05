import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initState = {
  ingredians: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredians: {
          ...state.ingredians,
          [action.ingrediantName]: state.ingredians[action.ingrediantName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingrediantName],
        building: true,
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredians: {
          ...state.ingredians,
          [action.ingrediantName]: state.ingredians[action.ingrediantName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingrediantName],
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        //ingredians: action.ingredients,
        ingredians: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        totalPrice: initState.totalPrice,
        error: false,
        building: false,
      };
    case actionTypes.GET_INGREDIENTS_FAIL:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;