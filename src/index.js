import "unfetch/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { UserProvider } from "./contexts/UserContext";
import App from "./components/App/App";
import "./index.css";
import * as serviceWorker from "../src/serviceWorker";
import { usePromiseTracker } from "react-promise-tracker";

const LoadingIndicator = (props) => {
  const { promiseInProgress } = usePromiseTracker();
  return promiseInProgress;
};
ReactDOM.render(
  <UserProvider>
    <App />
    <LoadingIndicator />
  </UserProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
