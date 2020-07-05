import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";

//sync

export const purchasBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchasBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchasBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchasinit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};
export const fetchOrderSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};
export const fetchOrderFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};

//async call

export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrderStart());
    const quearyParmams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    console.log("fetchOrders", quearyParmams);
    axios
      .get(
        "https://react-my-burger-12fe5.firebaseio.com//orders.json" +
          quearyParmams
      )
      .then((response) => {
        const fatchOrders = [];
        for (let key in response.data) {
          fatchOrders.push({
            ...response.data[key],
            id: key,
          });
        }
        dispatch(fetchOrderSuccess(fatchOrders));
      })
      .catch((error) => {
        dispatch(fetchOrderFail(error));
      });
  };
};

export const purchasBurger = (orderData, token) => {
  return (dispatch) => {
    dispatch(purchasBurgerStart());
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then((response) => {
        dispatch(purchasBurgerSuccess(response.data.name, orderData));
        //  this.setState({ loading: false });
        //this.props.history.push("/");
      })
      .catch((error) => {
        dispatch(purchasBurgerFail(error));
      });
  };
};
