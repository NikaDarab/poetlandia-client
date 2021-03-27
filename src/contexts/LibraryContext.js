import React, { Component } from "react";
// import config from "../../config";

export const LibraryContext = React.createContext({
  libraries: [],
  filterdByPoem: null,
  filteredByPoet: null,
});

export class LibraryProvider extends Component {
  state = {
    libraries: [],
    error: null,
    filterdByPoem: null,
    filteredByPoet: null,
  };

  getLibraries = (libraries) => {
    this.setState({
      libraries,
    });
  };

  addLibrary = (library) => {
    this.setState({
      libraries: [library, ...this.state.libraries],
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

  handleFilterPoem = (poem) => {
    this.setState({
      filteredByPoem: poem,
    });
  };

  render() {
    let value = {
      libraries: this.state.libraries,
      filterdByPoem: this.state.filterdByPoem,
      getLibraries: this.getLibraries,
      addLibrary: this.addLibrary,
      deleteLibrary: this.deleteLibrary,
      editLibrary: this.editLibrary,
      handleFilterPoem: this.handleFilterPoem,
    };
    return (
      <LibraryContext.Provider value={value}>
        {this.props.children}
      </LibraryContext.Provider>
    );
  }
}
