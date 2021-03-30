import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ContextsProvider } from "../../contexts/PoemContext";
import PoemForm from "./PoemForm";
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <ContextsProvider>
      <BrowserRouter>
        <PoemForm />
      </BrowserRouter>
    </ContextsProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
