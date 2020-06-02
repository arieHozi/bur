import React from "react";
import Layout from "./components/Layout/Layout";
import BurgerBuider from "./containers/BurgerBuider/BurgerBuider";

function App() {
  return (
    <div>
      <Layout>
        <BurgerBuider />
      </Layout>
    </div>
  );
}

export default App;
