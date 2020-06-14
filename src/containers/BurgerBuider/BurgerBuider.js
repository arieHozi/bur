import React from "react";
// import Auxiliary from "../../hoc/Auxiliray";
import Burger from "../../components/Burger/Burger";
import BuidControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandling from "../../hoc/withErrorHandling";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};
class BurgerBuider extends React.Component {
  state = {
    Ingredians: null,

    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false,
  };
  componentDidMount() {
    axios
      .get("/ingridiants.json ")
      .then((response) => {
        this.setState({
          Ingredians: response.data,
        });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }
  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((idKey) => {
        return ingredients[idKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    const ispurchaseable = sum > 0;
    this.setState({
      purchaseable: ispurchaseable,
    });
  };
  addIngredientHandler = (type) => {
    const oldCount = this.state.Ingredians[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.Ingredians,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({
      totalPrice: newPrice,
      Ingredians: updatedIngredients,
    });
    this.updatePurchaseState(updatedIngredients);
  };
  removeIngredientHandler = (type) => {
    const oldCount = this.state.Ingredians[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.Ingredians,
    };
    updatedIngredients[type] = updatedCount;
    const priceDedaction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDedaction;

    this.setState({
      totalPrice: newPrice,
      Ingredians: updatedIngredients,
    });
    this.updatePurchaseState(updatedIngredients);
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
    const queryParames = [];
    for (let i in this.state.Ingredians) {
      queryParames.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.Ingredians[i])
      );
    }
    queryParames.push("price=" + this.state.totalPrice);
    const queryString = queryParames.join("&");
    console.log("queryString", queryString);

    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };
  render() {
    const disableInfo = {
      ...this.state.Ingredians,
    };
    for (let keys in disableInfo) {
      disableInfo[keys] = disableInfo[keys] <= 0;
    }

    let orderSummary = null;
    let burger = !this.state.error ? <Spinner /> : <p>Error loading data</p>;
    if (this.state.Ingredians) {
      burger = (
        <>
          <Burger ingredians={this.state.Ingredians} />
          <BuidControls
            addIngredient={this.addIngredientHandler}
            removeIngredient={this.removeIngredientHandler}
            disableInfo={disableInfo}
            purchaseable={this.state.purchaseable}
            totalSum={this.state.totalPrice}
            showOrder={this.showOrderHandel}
          />
        </>
      );
      orderSummary = (
        <OrderSummary
          ingredians={this.state.Ingredians}
          hide={this.purchasCancelHandeler}
          continue={this.purchasContinueHandeler}
          totalSum={this.state.totalPrice}
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

export default withErrorHandling(BurgerBuider, axios);
