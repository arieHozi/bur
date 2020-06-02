import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

class Model extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }
  componentWillUpdate() {
    console.log("model has updated");
  }
  render() {
    return (
      <>
        <Backdrop show={this.props.show} hide={this.props.hide} />
        <div
          className={classes.Modal}
          onClick={this.props.hide}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </>
    );
  }
}

export default Model;
