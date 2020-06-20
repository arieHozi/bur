import React from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class CheckOut extends React.Component {
  state = {
    ingredients: null,
    totalPrice: 0,
  };

  // componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;
  //   for (let param of query.entries()) {
  //     // ['salad', '1']
  //     if (param[0] === "price") {
  //       price = +param[1];
  //     } else {
  //       ingredients[param[0]] = +param[1];
  //     }
  //   }
  //   this.setState({ ingredients: ingredients, totalPrice: price });
  // }

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
          ingredians={this.props.ings}
          CheckoutCancelled={this.CheckoutCancelledHandler}
          CheckoutContinue={this.CheckoutContinueHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.ingredians,
  };
};

export default connect(mapStateToProps, null)(CheckOut);
