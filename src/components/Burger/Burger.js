import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
  //we need to transform the object Ingredeanse:{ingredeanceKey,ingredeanceValue} to array
  let transformIngredians = Object.keys(props.ingredians) ///["salad", "bacon", "cheese", "meat"]
    .map((ingredeanceKey) => {
      return [...Array(props.ingredians[ingredeanceKey])] ///[[1], [2], [3], [2]]
        .map((_, ingredeancvlaueIndex) => {
          return (
            <BurgerIngredient
              type={ingredeanceKey}
              key={ingredeanceKey + ingredeancvlaueIndex}
            />
          );
        });
    })
    .reduce((preValue, currentValue) => {
      return preValue.concat(currentValue);
    }, []);
  //The reduce() method executes a reducer function (that you provide) on each element of the array, resulting in single output value.
  if (transformIngredians.length === 0) {
    transformIngredians = <p>Please start adding ingredeance!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformIngredians}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
