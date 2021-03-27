import React, { Component } from "react";
// import config from "../../config";

export const PoemContext = React.createContext({
  poems: [],
  libraries: [],
});

export class ContextsProvider extends Component {
  state = {
    poems: [],
    libraries: [],
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
  getLibraries = (libraries) => {
    this.setState({
      libraries,
    });
  };

  addLibrary = (library) => {
    this.setState({
      libraries: [...this.state.libraries, library],
    });
  };

  deleteLibrary = (libraryId) => {
    console.log("delete");
    this.setState({
      libraries: this.state.libraries.filter(
        (library) => library.id !== libraryId
      ),
    });
  };

  editLibrary = (libraryId, newLibrary) => {
    let libraries = [...this.state.libraries];
    let foundIndex = libraries.findIndex((library) => library.id === libraryId);
    libraries[foundIndex] = newLibrary;
    this.setState({ libraries });
  };

  render() {
    let value = {
      poems: this.state.poems,
      libraries: this.state.libraries,
      getPoems: this.getPoems,
      addPoems: this.addPoems,
      deletePoem: this.deletePoem,
      editPoem: this.editPoem,
      getLibraries: this.getLibraries,
      addLibrary: this.addLibrary,
      deleteLibrary: this.deleteLibrary,
      editLibrary: this.editLibrary,
    };
    return (
      <PoemContext.Provider value={value}>
        {this.props.children}
      </PoemContext.Provider>
    );
  }
}
