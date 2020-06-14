import React from "react";
import Button from "../../UI/Button/Button";

class OrderSummary extends React.Component {
  //this could be turn back to stseless component

  render() {
    const ingredianSummary = Object.keys(this.props.ingredians).map((igKey) => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span> :{" "}
          {this.props.ingredians[igKey]}
        </li>
      );
    });

    return (
      <>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredianSummary}</ul>
        <p>
          Total sum : <strong>{this.props.totalSum.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout</p>

        <Button btnType="Danger" clicked={this.props.hide}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.continue}>
          CONTINUE
        </Button>
      </>
    );
  }
}

export default OrderSummary;
