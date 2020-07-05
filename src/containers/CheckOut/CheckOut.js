import React from "react";
import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class CheckOut extends React.Component {
  state = {
    ingredients: null,
    totalPrice: 0,
  };

  CheckoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  CheckoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchaed ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {purchasedRedirect}
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

    return summary;
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.bld.ingredians,
    purchaed: state.ord.purchased,
  };
};

export default connect(mapStateToProps)(CheckOut);
