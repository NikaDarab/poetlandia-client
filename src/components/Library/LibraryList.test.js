import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ContextsProvider } from "../../contexts/PoemContext";
import { UserProvider } from "../../contexts/UserContext";
import LibraryList from "./LibraryList";
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <UserProvider>
      <ContextsProvider>
        <BrowserRouter>
          <LibraryList />
        </BrowserRouter>
      </ContextsProvider>
    </UserProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
