import React, { Component } from "react";
import { PoemContext } from "../../contexts/PoemContext";
import UserContext from "../../contexts/UserContext";
// import { LibraryContext } from "../../contexts/LibraryContext";
import PoemApiService from "../../services/poem-api-service";
import LibraryApiService from "../../services/library-api-services";
import EditPoem from "./EditPoem";
import Display from "../Search/Display";
import moment from "moment";
import { Link } from "react-router-dom";

class PoemList extends Component {
  state = {
    editToggle: null,
    showPoem: false,
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

  handleShow = () => {
    this.setState({
      showPoem: !this.state.showPoem,
    });
  };

  handleFave = (title, author, lines, poemId) => {
    // console.log("faved");
    let library = {
      title: title,
      author: author,
      lines: lines,
      date_created: moment().format("LLL"),
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
          <UserContext.Consumer>
            {(userContext) =>
              !userContext.buttonToggle ? (
                <div className="feather">
                  <button
                    onClick={() => this.props.handleClick()}
                    type="submit"
                  >
                    <i className="fa fa-feather add"></i>
                  </button>
                </div>
              ) : null
            }
          </UserContext.Consumer>
        </div>

        <div className="poem-item-wrapper">
          <ul>
            {this.context.poems.map((poem) => (
              <div key={parseInt(Date.now() * Math.random())}>
                <div>
                  <div className="edit-delete">
                    <button onClick={() => this.handleDelete(poem.id)}>
                      <i className="fa fa-trash delete" aria-hidden="true"></i>
                    </button>

                    <button onClick={() => this.handleEdit(poem.id)}>
                      <i className="fa fa-edit edit" aria-hidden="true"></i>
                    </button>
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
                      publish
                    </button>
                  </div>
                  {this.state.editToggle === poem.id ? (
                    <EditPoem
                      title={poem.title}
                      author={poem.author}
                      lines={poem.lines}
                      poemId={poem.id}
                      handleEdit={this.handleEdit}
                    />
                  ) : null}
                  <button>
                    <h2 onClick={this.handleShow} className="title">
                      {poem.title}
                    </h2>
                  </button>

                  <h3>By {poem.author}</h3>
                  <br />
                  {this.state.showPoem ? (
                    !poem.lines.includes(",") ? (
                      <p>{poem.lines}</p>
                    ) : (
                      poem.lines
                        .split(",")
                        .map((p) => (
                          <p key={parseInt(Date.now() * Math.random())}>{p}</p>
                        ))
                    )
                  ) : null}

                  <p>Posted on : {moment(poem.date_created).format("LLL")}</p>
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

export default PoemList;
