import React, { Component } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import UserContext from "../../contexts/UserContext";
// import Feather from "../../assets/blue-feather.png";

class Header extends Component {
  static contextType = UserContext;

  handleLogoutClick = () => {
    this.context.processLogout();
  };

  renderLogoutLink() {
    return (
      <>
        {/* <span className="username">current user:{this.context.user.name}</span> */}

        <li className="auth-link">
          <Link onClick={this.handleLogoutClick} to="/login">
            Logout
          </Link>
        </li>
      </>
    );
  }

  renderLoginLink() {
    return (
      <>
        <li className="auth-link">
          <Link to="/login">Login</Link>
        </li>{" "}
        <li className="auth-link">
          <Link to="/register">Sign up</Link>
        </li>
      </>
    );
  }

  render() {
    return (
      <>
        <header className="header">
          <h1>
            <li className="spaced">
              <Link to="/">POETLANDIA</Link>
            </li>

            <li>
              <Link to="/drafts">Drafts</Link>
            </li>
            {/* <li>Favorites</li> */}

            <li>
              <Link to="/collaboration">Collab</Link>
            </li>
            <li>
              <Link to="/library">Library</Link>
            </li>
            {TokenService.hasAuthToken()
              ? this.renderLogoutLink()
              : this.renderLoginLink()}
          </h1>
        </header>
      </>
    );
  }
}

export default Header;
