import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Header from "../Header/Header";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import PublicOnlyRoute from "../PublicOnlyRoute/PublicOnlyRoute";
import RegistrationRoute from "../../routes/RegistrationRoute/RegistrationRoute";
import LoginRoute from "../../routes/LoginRoute/LoginRoute";
import DashboardRoute from "../../routes/DashboardRoute/DashboardRoute";
// import LearningRoute from "../../routes/LearningRoute/LearningRoute";
import NotFoundRoute from "../../routes/NotFoundRoute/NotFoundRoute";
import Search from "../Search/Search";
import { ContextsProvider } from "../../contexts/PoemContext";
import Library from "../Library/Library";
import Draft from "../Draft/Draft";
import EditPoem from "../PoemList/EditPoem";

// import "./App.css";

export default class App extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    console.error(error);

    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    return (
      <BrowserRouter>
        <ContextsProvider>
          <div className="App">
            <main>
              <Header />

              {hasError && <p>There was an error! Oh no!</p>}

              <Switch>
                <PrivateRoute exact path={"/"} component={DashboardRoute} />
                <PrivateRoute path={"/drafts"} component={Draft} />
                <PrivateRoute path={"/library"} component={Library} />
                <PrivateRoute path={"/edit"} component={EditPoem} />
                <PublicOnlyRoute
                  path={"/register"}
                  component={RegistrationRoute}
                />

                <Route path="/search" component={Search} />
                <PublicOnlyRoute path={"/login"} component={LoginRoute} />
                <Route component={NotFoundRoute} />
              </Switch>
            </main>
          </div>
        </ContextsProvider>
      </BrowserRouter>
    );
  }
}
