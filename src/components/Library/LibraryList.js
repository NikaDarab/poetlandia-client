import { Component } from "react";
import { LibraryContext } from "../../contexts/LibraryContext";
import LibraryApiService from "../../services/library-api-services";

import moment from "moment";
class LibraryList extends Component {
  static contextType = LibraryContext;
  state = {
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

  handleFilter = (e) => {
    e.preventDefault();
    let poem = e.target.poem.value;
    // this.context.handleFilteredPoem(poem);
    this.context.handleFilterPoem(poem);
    console.log(this.context.filteredByPoem);
  };

  renderSearchBar = () => {
    return (
      <div className="search-bar">
        <form onSubmit={this.handleFilter}>
          {/* <div>
            <label htmlFor="name">
              Name of the poet
              <input type="text" name="poet" />
            </label>
          </div> */}
          <div>
            <label htmlFor="poem">
              Name of the poem
              <input type="text" name="poem" />
            </label>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  };
  componentDidMount = () => {
    LibraryApiService.getLibrary().then((library) => {
      this.context.getLibraries(library);
    });
  };
  render() {
    let libraries = this.context.libraries;
    if (this.context.handleFilterPoem) {
      libraries = this.context.libraries.filter((library) =>
        library.title.includes(this.context.filteredByPoem)
      );
    }
    return (
      <>
        {this.renderSearchBar()}
        <div className="poem-item-wrapper" style={{ margin: "20px 0" }}>
          <ul>
            {this.context.libraries.map((library) => (
              <div key={parseInt(Date.now() * Math.random())}>
                <div>
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
