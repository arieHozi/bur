import React from "react";
import Burger from "../Burger/Burger";
import Button from "../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredians={props.ingredians} />
      </div>
      <Button btnType="Danger" clicked={props.hide}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.continue}>
        CONTINUE
      </Button>
    </div>
  );
};

export default checkoutSummary;
