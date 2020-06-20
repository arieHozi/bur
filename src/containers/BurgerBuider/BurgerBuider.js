import React from "react";
// import Auxiliary from "../../hoc/Auxiliray";
import Burger from "../../components/Burger/Burger";
import BuidControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandling from "../../hoc/withErrorHandling";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/action";

class BurgerBuider extends React.Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  };
  componentDidMount() {
    console.log(this.props);

    // axios
    //   .get("/ingridiants.json ")
    //   .then((response) => {
    //     this.setState({
    //       Ingredians: response.data,
    //     });
    //   })
    //   .catch((error) => {
    //     this.setState({ error: true });
    //   });
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
    let burger = !this.state.error ? <Spinner /> : <p>Error loading data</p>;
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
      if (this.state.loading) {
        orderSummary = <Spinner />;
      }
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
  console.log(state);

  return {
    ings: state.ingredians,
    totSum: state.totalPrice,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingName) =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingrediantName: ingName }),
    onRemoveIngredient: (ingName) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingrediantName: ingName,
      }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandling(BurgerBuider, axios));
