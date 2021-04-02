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
      let newLibrary = library.map((lib) => ({
        ...lib,
        lines: lib.lines.split(","),
      }));
      this.context.getLibraries(newLibrary);
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
          library.lines.includes(this.context.filteredByPoem.toLowerCase())
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
        <div className="welcome">
          <p>Welcome to our global library!</p>
        </div>

        <div className="poem-item-wrapper ">
          <ul>
            {libraries.map((library) => (
              <div
                style={{ textAlign: "center" }}
                key={parseInt(Date.now() * Math.random())}
              >
                <div>
                  <div className="edit-delete">
                    <UserContext.Consumer>
                      {(userContext) => (
                        <div>
                          <div
                            style={{
                              float: "left",
                            }}
                          >
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
                                style={{ textAlign: "center" }}
                                className="fa fa-trash delete"
                                aria-hidden="true"
                              ></i>
                            </button>
                          </div>
                          <div style={{ float: "left" }}>
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

                  <button>
                    <h2
                      onClick={() => this.handleShow(library.id)}
                      className="title"
                    >
                      {library.title}
                    </h2>
                  </button>

                  {/* <h3 className="author">By {library.author}</h3>
                <br /> */}

                  {this.state.showLibrary === library.id ? (
                    !library.lines.includes(",") ? (
                      <p className="lines">{library.lines}</p>
                    ) : (
                      library.lines.split(",").map((p) => (
                        <p
                          className="lines"
                          // className="lines"
                          key={parseInt(Date.now() * Math.random())}
                        ></p>
                      ))
                    )
                  ) : null}
                  {this.state.showLibrary === library.id ? (
                    <>
                      <h3>By {library.author}</h3>
                      <p>
                        Published on{" "}
                        {moment(library.date_created).format("LLL")}
                      </p>
                    </>
                  ) : null}
                  <br />

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
