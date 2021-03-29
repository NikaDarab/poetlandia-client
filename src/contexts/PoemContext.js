import React, { Component } from "react";
// import config from "../../config";

export const PoemContext = React.createContext({
  poems: [],
  libraries: [],
  collaborations: [],
  filteredByPoem: null,
});

export class ContextsProvider extends Component {
  state = {
    poems: [],
    libraries: [],
    collaborations: [],
    filteredByPoem: null,
    error: null,
  };

  getPoems = (poems) => {
    console.log(poems);
    this.setState({
      poems,
    });
  };

  addPoems = (poem) => {
    this.setState({
      poems: [poem, ...this.state.poems],
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
  getCollaborations = (collaborations) => {
    this.setState({
      collaborations,
    });
  };

  addCollaboration = (collaboration) => {
    this.setState({
      collaborations: [...this.state.collaborations, collaboration],
    });
  };
  deleteCollaboration = (collaborationId) => {
    this.setState({
      collaborations: this.state.collaborations.filter(
        (collaboration) => collaboration.id !== collaborationId
      ),
    });
  };
  editCollaboration = (collaborationId, newCollaboration) => {
    let collaborations = [...this.state.collaborations];
    let foundIndex = collaborations.findIndex(
      (collaboration) => collaboration.id === collaborationId
    );
    collaborations[foundIndex] = newCollaboration;
    this.setState({ collaborations });
  };
  handleFilterPoem = (poem) => {
    this.setState({
      filteredByPoem: poem,
    });
    console.log(this.state.filteredByPoem);
  };
  render() {
    let value = {
      poems: this.state.poems,
      libraries: this.state.libraries,
      collaborations: this.state.collaborations,
      filteredByPoem: this.state.filteredByPoem,
      getPoems: this.getPoems,
      addPoems: this.addPoems,
      deletePoem: this.deletePoem,
      editPoem: this.editPoem,
      getLibraries: this.getLibraries,
      addLibrary: this.addLibrary,
      deleteLibrary: this.deleteLibrary,
      editLibrary: this.editLibrary,
      getCollaborations: this.getCollaborations,
      addCollaboration: this.addCollaboration,
      deleteCollaboration: this.deleteCollaboration,
      editCollaboration: this.editCollaboration,
      handleFilterPoem: this.handleFilterPoem,
    };
    return (
      <PoemContext.Provider value={value}>
        {this.props.children}
      </PoemContext.Provider>
    );
  }
}
