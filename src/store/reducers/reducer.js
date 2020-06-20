import * as actionTypes from "../actions/action";

const initState = {
  ingredians: {
    salad: 0,
    cheese: 0,
    meat: 0,
    bacon: 0,
  },
  totalPrice: 4,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const reducer = (state = initState, action) => {
  console.log("{im here}", state.totalPrice);
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredians: {
          ...state.ingredians,
          [action.ingrediantName]: state.ingredians[action.ingrediantName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingrediantName],
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
    default:
      return state;
  }
  return state;
};

export default reducer;
