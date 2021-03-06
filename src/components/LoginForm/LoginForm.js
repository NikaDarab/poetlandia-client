import React, { Component } from "react";
import { Input, Label } from "../Form/Form";
import AuthApiService from "../../services/auth-api-service";
import UserContext from "../../contexts/UserContext";

class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {},
  };

  static contextType = UserContext;

  state = { error: null };

  firstInput = React.createRef();

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { username, password } = ev.target;

    this.setState({ error: null });

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then((res) => {
        username.value = "";
        password.value = "";
        this.context.processLogin(res.authToken);
        this.props.onLoginSuccess();
        window.location = "/";
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
      <div className="login-form">
        <form onSubmit={this.handleSubmit}>
          <div role="alert">{error && <p>{error}</p>}</div>
          <div style={{ padding: "  10px 0" }}>
            <div>username: admin</div>
            <div>password: Password1!</div>
          </div>

          <div>
            <Label htmlFor="login-username-input">Username</Label>
            <Input
              ref={this.firstInput}
              id="login-username-input"
              name="username"
              required
            />
          </div>
          <div>
            <Label htmlFor="login-password-input">Password</Label>
            <Input
              id="login-password-input"
              name="password"
              type="password"
              required
            />
          </div>
          <button style={{ padding: "0 20% 0 0" }} type="submit">
            <div className="signup">Login</div>
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
