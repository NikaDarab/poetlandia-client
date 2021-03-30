import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ContextsProvider } from "../../contexts/PoemContext";
import CollaborationList from "./CollaborationList";
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <ContextsProvider>
      <BrowserRouter>
        <CollaborationList />
      </BrowserRouter>
    </ContextsProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
