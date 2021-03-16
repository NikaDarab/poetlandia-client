import React, { Component } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";

class LoginRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  handleLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || "/";
    history.push(destination);
  };

  render() {
    return (
      <section>
        <LoginForm onLoginSuccess={this.handleLoginSuccess} />
        <h2 style={{ display: "none" }}>Login</h2>
      </section>
    );
  }
}

export default LoginRoute;
