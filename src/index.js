import "unfetch/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { UserProvider } from "./contexts/UserContext";
import App from "./components/App/App";
import "./index.css";
import * as serviceWorker from "../src/serviceWorker";

ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
