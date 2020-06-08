import React from "react";
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";

class CheckOut extends React.Component {
  state = {
    ingredians: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1,
    },
  };
  render() {
    return (
      <div>
        <CheckoutSummary ingredians={this.state.ingredians} />
      </div>
    );
  }
}

export default CheckOut;
