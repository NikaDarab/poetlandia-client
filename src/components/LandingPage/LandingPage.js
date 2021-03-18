import React, { Component } from "react";
// import { Route, Switch, BrowserRouter } from "react-router-dom";
// import Header from "../Header/Header";

export default class LandingPage extends Component {
  state = { hasError: false };

  render() {
    const { hasError } = this.state;
    return (
      <>
        <div className="LandingPage">
          <main>{hasError && <p>There was an error! Oh no!</p>}</main>
        </div>
      </>
    );
  }
}
