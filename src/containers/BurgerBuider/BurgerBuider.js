import React from "react";
import Burger from "../../components/Burger/Burger";
import BuidControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandling from "../../hoc/withErrorHandling";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class BurgerBuider extends React.Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onInitIngredient();
  }
  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((idKey) => {
        return ingredients[idKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  showOrderHandel = () => {
    if (this.props.isAuth) {
      this.setState({
        purchasing: true,
      });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
    this.setState({
      purchasing: true,
    });
  };

  purchasCancelHandeler = () => {
    this.setState({
      purchasing: false,
    });
  };

  purchasContinueHandeler = () => {
    this.props.onInitPurchased();
    this.props.history.push("/checkout");
  };
  render() {
    const disableInfo = {
      ...this.props.ings,
    };
    for (let keys in disableInfo) {
      disableInfo[keys] = disableInfo[keys] <= 0;
    }

    let orderSummary = null;
    let burger = !this.props.ingLoadError ? (
      <Spinner />
    ) : (
      <p>Error loading data</p>
    );
    if (this.props.ings) {
      burger = (
        <>
          <Burger ingredians={this.props.ings} />
          <BuidControls
            addIngredient={this.props.onAddIngredient}
            removeIngredient={this.props.onRemoveIngredient}
            disableInfo={disableInfo}
            purchaseable={this.updatePurchaseState(this.props.ings)}
            totalSum={this.props.totSum}
            showOrder={this.showOrderHandel}
            isAuth={this.props.isAuth}
          />
        </>
      );
      orderSummary = (
        <OrderSummary
          ingredians={this.props.ings}
          hide={this.purchasCancelHandeler}
          continue={this.purchasContinueHandeler}
          totalSum={this.props.totSum}
        />
      );
      // if (this.state.loading) {
      //   orderSummary = <Spinner />;
      // }
    }

    return (
      <>
        <Modal show={this.state.purchasing} hide={this.purchasCancelHandeler}>
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.bld.ingredians,
    totSum: state.bld.totalPrice,
    ingLoadError: state.bld.error,
    isAuth: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingName) => dispatch(actions.add_ingredient(ingName)),
    onRemoveIngredient: (ingName) =>
      dispatch(actions.remove_ingredient(ingName)),
    onInitIngredient: () => dispatch(actions.initIngredient()),
    onInitPurchased: () => dispatch(actions.purchasinit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandling(BurgerBuider, axios));
