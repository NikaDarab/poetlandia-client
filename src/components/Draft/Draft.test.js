import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "../../contexts/UserContext";
import Draft from "./Draft";
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    // <UserProvider>
    <BrowserRouter>
      <Draft />
    </BrowserRouter>,
    // </UserProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
