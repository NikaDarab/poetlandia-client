import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Input, Required, Label } from "../Form/Form";
import AuthApiService from "../../services/auth-api-service";

import UserContext from "../../contexts/UserContext";
// import ladypoet from "../../assets/lady-poet.png";
// import "./RegistrationForm.css";

class RegistrationForm extends Component {
  static contextType = UserContext;
  static defaultProps = {
    onRegistrationSuccess: () => {},
  };

  state = { error: null };

  firstInput = React.createRef();

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { name, username, password } = ev.target;
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    })
      .then((user) => {
        // name.value = "";
        // username.value = "";
        // password.value = "";
        // this.props.onRegistrationSuccess();
        AuthApiService.postLogin({
          username: username.value,
          password: password.value,
        }).then((res) => {
          name.value = "";
          username.value = "";
          password.value = "";
          this.context.processLogin(res.authToken);
          this.props.onRegistrationSuccess();
          window.location = "/";
        });
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  componentDidMount() {
    this.firstInput.current.focus();
  }

  render() {
    const { error } = this.state;
    return (
      <div>
        <div className="description">
          {/* <p className="animate__animated animate__pulse ">Poetlandia</p> */}
        </div>

        <div className="login-form register">
          <div className="form-wrapper">
            <form className="registration-form" onSubmit={this.handleSubmit}>
              <div role="alert">{error && <p>{error}</p>}</div>
              <div>
                <Label htmlFor="registration-name-input">
                  Enter your name
                  <Required />
                </Label>
                <Input
                  ref={this.firstInput}
                  id="registration-name-input"
                  name="name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="registration-username-input">
                  Choose a username
                  <Required />
                </Label>
                <Input
                  id="registration-username-input"
                  name="username"
                  required
                />
              </div>
              <div>
                <Label htmlFor="registration-password-input">
                  Choose a password
                  <Required />
                </Label>
                <Input
                  id="registration-password-input"
                  name="password"
                  type="password"
                  required
                />
              </div>
              <footer>
                <button style={{ padding: "0 20% 0 0" }} type="submit">
                  <div className="signup">Sign up</div>
                </button>
                <Link to="/login">Already have an account?</Link>
              </footer>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default RegistrationForm;
