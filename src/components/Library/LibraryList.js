import { Component } from "react";
import { PoemContext } from "../../contexts/PoemContext";
import LibraryApiService from "../../services/library-api-services";
import UserContext from "../../contexts/UserContext";
import EditLibrary from "./EditLibrary";

import moment from "moment";
class LibraryList extends Component {
  static contextType = PoemContext;
  state = {
    editToggle: null,
    showLibrary: null,
  };
  handleShow = (libraryId) => {
    if (this.state.showLibrary === libraryId) {
      this.setState({
        showLibrary: null,
      });
    } else {
      this.setState({
        showLibrary: libraryId,
      });
    }
  };

  handleDelete = (libraryId) => {
    this.context.deleteLibrary(libraryId);
    LibraryApiService.deleteLibrary(libraryId);
  };
  handleEdit = (libraryId) => {
    if (this.state.editToggle === libraryId) {
      this.setState({
        editToggle: null,
      });
    } else {
      this.setState({
        editToggle: libraryId,
      });
    }
    console.log(libraryId);
  };
  handleFilter = (e) => {
    e.preventDefault();
    let poem = e.target.poem.value;
    console.log(poem);
    this.context.handleFilterPoem(poem);
    console.log(this.context.filteredByPoem);
  };

  componentDidMount = () => {
    LibraryApiService.getLibrary().then((library) => {
      this.context.getLibraries(library);
    });
  };
  render() {
    let libraries = this.context.libraries;
    if (this.context.filteredByPoem) {
      libraries = this.context.libraries.filter(
        (library) =>
          library.title
            .toLowerCase()
            .includes(this.context.filteredByPoem.toLowerCase()) ||
          library.author
            .toLowerCase()
            .includes(this.context.filteredByPoem.toLowerCase()) ||
          library.lines
            .toLowerCase()
            .includes(this.context.filteredByPoem.toLowerCase())
      );
    } else {
      libraries = this.context.libraries;
    }

    return (
      <>
        <div className="search-bar">
          <form onSubmit={this.handleFilter} id="demo-2">
            <label htmlFor="poem">
              <input type="search" placeholder="Search" name="poem" />
            </label>
          </form>
        </div>

        <div className="poem-item-wrapper" style={{ margin: "20px 0" }}>
          <ul>
            {libraries.map((library) => (
              <div key={parseInt(Date.now() * Math.random())}>
                <div>
                  <div id="wrap" style={{ position: "relative" }}>
                    <UserContext.Consumer>
                      {(userContext) => (
                        <div id="left">
                          <button
                            onClick={() => this.handleDelete(library.id)}
                            style={{
                              display:
                                library.author === userContext.user.name
                                  ? "block"
                                  : "none",
                            }}
                          >
                            <i
                              className="fa fa-trash delete"
                              aria-hidden="true"
                            ></i>
                          </button>
                        </div>
                      )}
                    </UserContext.Consumer>
                    <UserContext.Consumer>
                      {(userContext) => (
                        <div id="right">
                          <button
                            onClick={() => this.handleEdit(library.id)}
                            style={{
                              display:
                                library.author === userContext.user.name
                                  ? "block"
                                  : "none",
                            }}
                          >
                            <i
                              className="fa fa-edit edit"
                              aria-hidden="true"
                            ></i>
                          </button>
                        </div>
                      )}
                    </UserContext.Consumer>
                  </div>
                  {this.state.editToggle === library.id ? (
                    <EditLibrary
                      title={library.title}
                      author={library.author}
                      lines={library.lines}
                      libraryId={library.id}
                      handleEdit={this.handleEdit}
                    />
                  ) : null}
                  <button onClick={() => this.handleShow(library.id)}>
                    <h2 className="title">{library.title}</h2>
                  </button>
                  <h3 className="author">By {library.author}</h3>
                  <br />
                  <h4 className="publish">
                    Published on {moment(library.date_created).format("LLL")}
                  </h4>
                  <br />
                  {this.state.showLibrary === library.id ? (
                    !library.lines.includes(",") ? (
                      <p className="lines">{library.lines}</p>
                    ) : (
                      library.lines.split(",").map((p) => (
                        <p
                          className="lines"
                          key={parseInt(Date.now() * Math.random())}
                        >
                          {p}
                        </p>
                      ))
                    )
                  ) : null}
                  <hr />
                  <br />
                </div>
              </div>
            ))}
          </ul>
        </div>
      </>
    );
  }
}

export default LibraryList;
