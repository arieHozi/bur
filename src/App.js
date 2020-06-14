import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import BurgerBuider from "./containers/BurgerBuider/BurgerBuider";
import CheckOut from "./containers/CheckOut/CheckOut";
import Orders from "./containers/Orders/Orders";

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/checkout" component={CheckOut} />
          <Route path="/orders" component={Orders} />
          <Route path="/" component={BurgerBuider} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
