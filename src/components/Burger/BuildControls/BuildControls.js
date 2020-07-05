import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.module.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Current Price :<strong>{props.totalSum.toFixed(2)}</strong>
    </p>
    {controls.map((control) => {
      return (
        <BuildControl
          key={control.label}
          label={control.label}
          remove={() => props.removeIngredient(control.type)}
          added={() => props.addIngredient(control.type)}
          disabelButton={props.disableInfo[control.type]}
        />
      );
    })}

    <button
      className={classes.OrderButton}
      disabled={!props.purchaseable}
      onClick={props.showOrder}
    >
      {props.isAuth ? "ORDER NOW" : "Signup to continue"}
    </button>
  </div>
);
export default buildControls;
