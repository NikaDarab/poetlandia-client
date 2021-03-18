import React, { Component } from "react";
// import config from "../../config";

export const PoemContext = React.createContext({
  poems: [],
  library: [],
});

export class ContextsProvider extends Component {
  state = {
    poems: [],
    library: [],
    error: null,
  };

  getPoems = (poems) => {
    this.setState({
      poems,
    });
  };

  addPoems = (poems) => {
    this.setState({
      poems: [...this.state.poems, poems],
    });
  };

  deletePoem = (poemId) => {
    console.log("delete");
    this.setState({
      poems: this.state.poems.filter((poem) => poem.id !== poemId),
    });
  };

  editPoem = (poemId, newPoem) => {
    let poems = [...this.state.poems];
    let foundIndex = poems.findIndex((poem) => poem.id === poemId);
    poems[foundIndex] = newPoem;
    this.setState({ poems });
  };

  render() {
    let value = {
      poems: this.state.poems,
      getPoems: this.getPoems,
      library: this.state.library,
      addLibrary: this.addLibrary,
      addPoems: this.addPoems,
      deletePoem: this.deletePoem,
      editPoem: this.editPoem,
    };
    return (
      <PoemContext.Provider value={value}>
        {this.props.children}
      </PoemContext.Provider>
    );
  }
}
