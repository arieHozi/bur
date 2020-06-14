import React from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-order";
import withErrorHandle from "../../hoc/withErrorHandling";

class Orders extends React.Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount() {
    axios
      .get("https://react-my-burger-12fe5.firebaseio.com//orders.json")
      .then((response) => {
        console.log(response);

        const fatchOrders = [];
        for (let key in response.data) {
          fatchOrders.push({
            ...response.data[key],
            id: key,
          });
        }
        this.setState({
          loading: false,
          orders: fatchOrders,
        });
      })
      .catch((error) => {
        this.setState({ loading: true });
      });
  }

  render() {
    console.log(this.state);

    return (
      <div>
        {this.state.orders.map((order) => (
          <Order
            key={order.id}
            ingrediant={order.ingrediants}
            price={order.price}
          />
        ))}
      </div>
    );
  }
}

export default withErrorHandle(Orders, axios);
