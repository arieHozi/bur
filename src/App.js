import React from "react";
import Layout from "./components/Layout/Layout";
import BurgerBuider from "./containers/BurgerBuider/BurgerBuider";
import CheckOut from "./containers/CheckOut/CheckOut";

function App() {
  return (
    <div>
      <Layout>
        <BurgerBuider />
        <CheckOut />
      </Layout>
    </div>
  );
}

export default App;
