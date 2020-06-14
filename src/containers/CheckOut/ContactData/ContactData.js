import React from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends React.Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
    ingrediants: [],
  };

  componentDidMount() {
    console.log("ContactData", this.props);
  }
  orderHendler = (event) => {
    event.preventDefault(); //prevent page re-render

    this.setState({ loading: true });

    const order = {
      ingrediants: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: this.state.name,
        address: {
          street: this.state.address.street,
          zipCode: this.state.address.postalCode,
          country: "israel",
        },
        email: this.state.email,
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
      });
  };

  render() {
    let form = (
      <form>
        <input type="text" name="name" placeholder="Your name" />
        <input type="text" name="email" placeholder="Your email" />
        <input type="text" name="street" placeholder="Your street" />
        <input type="text" name="postal-code" placeholder="Your postal code" />
        <Button btnType="Submit" clicked={this.orderHendler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}
export default ContactData;
