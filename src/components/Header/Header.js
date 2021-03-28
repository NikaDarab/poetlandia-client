import React, { Component } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import UserContext from "../../contexts/UserContext";
// import Search from "../Search/Search";

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

            {/* <li>
              <Link to="/poemform" handleClick={this.context.handleClick}>
                {" "}
                <div className="feather">
                  <button type="submit">
                    <i className="fa fa-feather add"></i>
                  </button>
                </div>
              </Link>
            </li> */}
            {/* 
            <li>
              <Link to="/search">Search</Link>
            </li> */}
            <li>
              <Link to="/drafts">Drafts</Link>
            </li>
            {/* <li>Favorites</li> */}
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
