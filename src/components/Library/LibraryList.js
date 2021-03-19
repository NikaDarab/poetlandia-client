import { Component } from "react";
import { LibraryContext } from "../../contexts/LibraryContext";
import LibraryApiService from "../../services/library-api-services";

class LibraryList extends Component {
  static contextType = LibraryContext;
  componentDidMount = () => {
    LibraryApiService.getLibrary().then((library) => {
      this.context.getLibraries(library);
      console.log(this.context.libraries);
    });
  };
  render() {
    return (
      <>
        <h2>Library of all poems</h2>
        <div>
          <ul>
            {this.context.libraries.map((library) => (
              <div className="poem-item" key={library.id}>
                <h2>Title :{library.title}</h2>
                <h3>Author :{library.author}</h3>
                <p>Poem: {library.lines}</p>
                {/* <button onClick={() => this.handleDelete(library.id)}>
                  Delete
                </button> */}
              </div>
            ))}
          </ul>
        </div>
      </>
    );
  }
}

export default LibraryList;
