import React, { Component } from "react";
import { PoemContext } from "../../contexts/PoemContext";
// import { LibraryContext } from "../../contexts/LibraryContext";
import PoemApiService from "../../services/poem-api-service";
import LibraryApiService from "../../services/library-api-services";
import EditPoem from "./EditPoem";

class PoemList extends Component {
  state = {
    editToggle: false,
  };
  static contextType = PoemContext;
  // static contextType = LibraryContext;

  handleDelete = (poemId) => {
    // console.log(poemId);
    this.context.deletePoem(poemId);
    PoemApiService.deletePoem(poemId);
  };

  handleEdit = () => {
    this.setState({
      editToggle: !this.state.editToggle,
    });
    console.log(this.state.editToggle);
  };

  handleFave = (title, author, lines, poemId) => {
    console.log("faved");
    let library = {
      title: title,
      author: author,
      lines: lines.split(","),
    };
    console.log(library);
    LibraryApiService.postLibrary(library).then((library) =>
      this.context.addLibrary(library)
    );
    this.handleDelete(poemId);
    window.location = "/library";
  };
  componentDidMount = () => {
    PoemApiService.getPoem().then((poem) => {
      this.context.getPoems(poem);
      //   console.log(this.context.poems);
    });
  };
  render() {
    return (
      <>
        <h2>List of poems</h2>
        <div>
          <ul>
            {this.context.poems.map((poem) => (
              <div className="poem-item" key={poem.id}>
                <h2>Title :{poem.title}</h2>
                <h3>Author :{poem.author}</h3>
                <p>Poem: {poem.lines}</p>
                <p>Date: {poem.date_created}</p>
                {console.log(poem)}
                <button onClick={() => this.handleDelete(poem.id)}>
                  Delete
                </button>
                <button onClick={this.handleEdit}>Edit</button>
                {this.state.editToggle ? (
                  <EditPoem
                    title={poem.title}
                    author={poem.author}
                    lines={poem.lines}
                    poemId={poem.id}
                    handleEdit={this.handleEdit}
                  />
                ) : null}
                <button
                  onClick={() =>
                    this.handleFave(
                      poem.title,
                      poem.author,
                      poem.lines,
                      poem.id
                    )
                  }
                >
                  Publish
                </button>
              </div>
            ))}
          </ul>
        </div>
      </>
    );
  }
}

export default PoemList;
