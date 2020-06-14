import React from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class CheckOut extends React.Component {
  state = {
    ingredients: null,
    totalPrice: 0,
  };

  componentWillMount() {
    console.log("Chackout", this.props);

    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      // ['salad', '1']
      if (param[0] === "price") {
        price = +param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredients, totalPrice: price });
  }

  CheckoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  CheckoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredians={this.state.ingredients}
          CheckoutCancelled={this.CheckoutCancelledHandler}
          CheckoutContinue={this.CheckoutContinueHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default CheckOut;
