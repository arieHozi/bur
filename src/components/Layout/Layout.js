import React from "react";
// import Auxiliary from "../../hoc/Auxiliray";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import Sidedrawer from "../Navigation/Sidedrawer/Sidedrawer";

class Layout extends React.Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false,
    });
  };

  drawerToggleHendler = () => {
    this.setState((prevState) => {
      return {
        showSideDrawer: !prevState.showSideDrawer,
      };
    });
  };

  render() {
    return (
      <>
        <Toolbar toggelDrawer={this.drawerToggleHendler} />
        <Sidedrawer
          open={this.state.showSideDrawer}
          close={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </>
    );
  }
}
export default Layout;
