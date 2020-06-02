import React from "react";
import classes from "../BurgerIngredient/BurgerIngredient.module.css";
import PropTypes from "prop-types";

class BurgerIngredient extends React.Component {
  render() {
    let ingeredient = null;

    switch (this.props.type) {
      case "bread-bottom":
        ingeredient = <div className={classes.BreadBottom}></div>;
        break;
      case "bread-top":
        ingeredient = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1}></div>
            <div className={classes.Seeds2}></div>
          </div>
        );
        break;
      case "meat":
        ingeredient = <div className={classes.Meat}></div>;
        break;
      case "cheese":
        ingeredient = <div className={classes.Cheese}></div>;
        break;
      case "salad":
        ingeredient = <div className={classes.Salad}></div>;
        break;
      case "bacon":
        ingeredient = <div className={classes.Bacon}></div>;
        break;
      default:
        ingeredient = null;
    }
    return ingeredient;
  }
}

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};
export default BurgerIngredient;
