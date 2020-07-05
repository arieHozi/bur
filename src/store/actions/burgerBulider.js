import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";

export const add_ingredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingrediantName: name,
  };
};
export const remove_ingredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingrediantName: name,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const getIngredientsFail = () => {
  return {
    type: actionTypes.GET_INGREDIENTS_FAIL,
  };
};
export const initIngredient = () => {
  return (dispatch) => {
    axios
      .get("/ingridiants.json")
      .then((response) => {
        dispatch(setIngredients(response.data));
      })
      .catch((error) => {
        dispatch(getIngredientsFail());
      });
  };
};
