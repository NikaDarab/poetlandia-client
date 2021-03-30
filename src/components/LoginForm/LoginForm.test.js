import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "../../contexts/UserContext";
import LoginForm from "./LoginForm";
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <UserProvider>
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    </UserProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
