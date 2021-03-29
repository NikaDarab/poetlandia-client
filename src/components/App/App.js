import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Header from "../Header/Header";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import PublicOnlyRoute from "../PublicOnlyRoute/PublicOnlyRoute";
import RegistrationRoute from "../../routes/RegistrationRoute/RegistrationRoute";
import LoginRoute from "../../routes/LoginRoute/LoginRoute";
import NotFoundRoute from "../../routes/NotFoundRoute/NotFoundRoute";
import Search from "../Search/Search";
import { ContextsProvider } from "../../contexts/PoemContext";
import { LibraryProvider } from "../../contexts/LibraryContext";
import { SearchProvider } from "../../contexts/SearchContext";
import LibraryList from "../Library/LibraryList";
import Draft from "../Draft/Draft";
import EditPoem from "../PoemList/EditPoem";
import PoemList from "../PoemList/PoemList";
import PoemForm from "../PoemForm/PoemForm";
import LandingPage from "../LandingPage/LandingPage";
import CollaborationList from "../../components/Collaboration/CollaborationList";

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
        <SearchProvider>
          <ContextsProvider>
            <LibraryProvider>
              <div className="App">
                <main>
                  <Header />

                  {hasError && <p>There was an error! Oh no!</p>}

                  <Switch>
                    {/* <PrivateRoute exact path={"/"} component={DashboardRoute} /> */}
                    <Route exact path={"/"} component={LandingPage} />
                    <PrivateRoute path={"/drafts"} component={Draft} />
                    <Route path={"/library"} component={LibraryList} />
                    <PrivateRoute
                      path={"/collaboration"}
                      component={CollaborationList}
                    />
                    <PrivateRoute path={"/edit"} component={EditPoem} />
                    <PrivateRoute path={"/poemlist"} component={PoemList} />
                    <PrivateRoute path={"/poemform"} component={PoemForm} />
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
            </LibraryProvider>
          </ContextsProvider>
        </SearchProvider>
      </BrowserRouter>
    );
  }
}
