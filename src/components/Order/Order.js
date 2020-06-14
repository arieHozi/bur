import React from "react";
import classes from "./Order.module.css";

const Order = (props) => {
  const ingre = [];
  for (let ingrediantName in props.ingrediant) {
    ingre.push({
      name: ingrediantName,
      amount: props.ingrediant[ingrediantName],
    });
  }

  const ingrediantOut = ingre.map((ig) => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #111",
          padding: "5px",
        }}
        key={ig.name}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>
        Ingredients:
        {ingrediantOut}
      </p>
      <p>
        Price:<strong>USD {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};
export default Order;
