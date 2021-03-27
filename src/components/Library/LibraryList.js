import { Component } from "react";
import { LibraryContext } from "../../contexts/LibraryContext";
import LibraryApiService from "../../services/library-api-services";
import UserContext from "../../contexts/UserContext";
import { PoemContext } from "../../contexts/PoemContext";
import moment from "moment";
class LibraryList extends Component {
  static contextType = LibraryContext;
  // static contextType = UserContext;
  componentDidMount = () => {
    LibraryApiService.getLibrary().then((library) => {
      this.context.getLibraries(library);
      // console.log(this.context.libraries);
    });
  };
  render() {
    return (
      <>
        <div className="poem-item-wrapper">
          <PoemContext.Consumer>
            {(poemContext) => {
              {
                poemContext.poems.map((poem) => <p>user id:{poem.user_id}</p>);
              }
            }}
          </PoemContext.Consumer>
          <ul>
            {this.context.libraries.map((library) => (
              <div key={library.id}>
                <h2 className="title"> {library.title}</h2>
                <h3>By {library.author}</h3>
                {!library.lines.includes(",") ? (
                  <p>{library.lines}</p>
                ) : (
                  library.lines
                    .split(",")
                    .map((p) => (
                      <p key={parseInt(Date.now() * Math.random())}>{p}</p>
                    ))
                )}
                <br />
                <p>Posted on : {moment(library.date_created).format("LLL")}</p>
                <hr />
              </div>
            ))}
          </ul>
        </div>
      </>
    );
  }
}

export default LibraryList;
