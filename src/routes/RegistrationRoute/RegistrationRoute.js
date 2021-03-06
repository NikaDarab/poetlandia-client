import React, { Component } from "react";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
// import "./RegistrationRoute.css";
class RegistrationRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  };

  handleRegistrationSuccess = () => {
    const { history } = this.props;
    history.push("/");
  };

  render() {
    return (
      <section>
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </section>
    );
  }
}

export default RegistrationRoute;
