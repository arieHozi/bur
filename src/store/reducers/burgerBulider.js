import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

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

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingrediantName]: state.ingredians[action.ingrediantName] + 1,
  };
  const updatedIngredients = updateObject(state.ingredians, updatedIngredient);
  const updatedState = {
    ingredians: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingrediantName],
    building: true,
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingrediantName]: state.ingredians[action.ingrediantName] - 1,
  };
  const updatedIngredients = updateObject(state.ingredians, updatedIngredient);
  const updatedState = {
    ingredians: updatedIngredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingrediantName],
    building: true,
  };
  return updateObject(state, updatedState);
};

const setIngredient = (state, action) => {
  return updateObject(state, {
    ingredians: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    totalPrice: initState.totalPrice,
    error: false,
    building: false,
  });
};

const getIngredientFail = (state, action) => {
  return updateObject(state, { error: true });
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredient(state, action);
    case actionTypes.GET_INGREDIENTS_FAIL:
      return getIngredientFail(state, action);
    default:
      return state;
  }
};

export default reducer;
