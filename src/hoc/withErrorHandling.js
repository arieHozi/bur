import React from "react";
import Model from "../components/UI/Modal/Modal";

const withErrorHandling = (WrappedComponent, axios) => {
  return class extends React.Component {
    state = {
      error: null,
    };
    componentWillMount() {
      this.reqIntercepter = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resIntercepter = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqIntercepter);
      axios.interceptors.response.eject(this.reqIntercepter);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <>
          <Model show={this.state.error} hide={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Model>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
};

export default withErrorHandling;
