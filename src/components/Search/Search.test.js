import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { SearchProvider } from "../../contexts/SearchContext";
import Search from "./Search";
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <SearchProvider>
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    </SearchProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
