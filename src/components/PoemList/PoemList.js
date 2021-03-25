import React, { Component } from "react";
import { PoemContext } from "../../contexts/PoemContext";
// import { LibraryContext } from "../../contexts/LibraryContext";
import PoemApiService from "../../services/poem-api-service";
import LibraryApiService from "../../services/library-api-services";
import EditPoem from "./EditPoem";
import Display from "../Search/Display";
import moment from "moment";

class PoemList extends Component {
  state = {
    editToggle: null,
  };
  static contextType = PoemContext;
  // static contextType = LibraryContext;

  handleDelete = (poemId) => {
    // console.log(poemId);
    this.context.deletePoem(poemId);
    PoemApiService.deletePoem(poemId);
  };

  handleEdit = (poemId) => {
    if (this.state.editToggle === poemId) {
      this.setState({
        editToggle: null,
      });
    } else {
      this.setState({
        editToggle: poemId,
      });
    }
  };

  handleFave = (title, author, lines, poemId, date_created) => {
    // console.log("faved");
    let library = {
      title: title,
      author: author,
      lines: lines,
      date_created: date_created,
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
        <div className="poem-item">
          {!this.props.buttonToggle ? (
            <button
              className="circle"
              onClick={() => this.props.handleClick()}
              type="submit"
            ></button>
          ) : null}
        </div>
        <div className="poem-item-wrapper">
          <ul>
            {this.context.poems.map((poem) => (
              <div key={parseInt(Date.now() * Math.random())}>
                {/* <Display poem={poem} /> */}
                <h2 className="title">{poem.title}</h2>
                <h3>By {poem.author}</h3>
                <br />
                {/* <p> {poem.lines}</p> */}
                {/* {console.log(poem.lines.split(",").length)} */}
                {!poem.lines.includes(",") ? (
                  <p>{poem.lines}</p>
                ) : (
                  poem.lines
                    .split(",")
                    .map((p) => (
                      <p key={parseInt(Date.now() * Math.random())}>{p}</p>
                    ))
                )}
                {/* {poem.lines.split(",").map((p) => (
                  <p key={parseInt(Date.now() * Math.random())}>{p}</p>
                ))} */}
                <br />
                <p>Date: {moment(poem.date_created).format("LLL")}</p>
                {/* {console.log(poem)} */}
                <button onClick={() => this.handleDelete(poem.id)}>
                  Delete
                </button>
                <button onClick={() => this.handleEdit(poem.id)}>Edit</button>
                {this.state.editToggle === poem.id ? (
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
                      poem.id,
                      poem.date_created
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
