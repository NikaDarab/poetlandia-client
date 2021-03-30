import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "../../contexts/UserContext";
import Header from "./Header";
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <UserProvider>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </UserProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
