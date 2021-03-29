import React, { Component } from "react";
import { PoemContext } from "../../contexts/PoemContext";
import UserContext from "../../contexts/UserContext";
// import { LibraryContext } from "../../contexts/LibraryContext";
import CollaborationApiService from "../../services/collaboration-api-service";
import LibraryApiService from "../../services/library-api-services";
import EditCollaboration from "./EditCollaboration";

import moment from "moment";

class CollaborationList extends Component {
  state = {
    editToggle: null,
    showCollaboration: null,
  };
  static contextType = PoemContext;

  handleDelete = (collaborationId) => {
    this.context.deleteCollaboration(collaborationId);
    CollaborationApiService.deleteCollaboration(collaborationId);
  };

  handleEdit = (collaborationId) => {
    if (this.state.editToggle === collaborationId) {
      this.setState({
        editToggle: null,
      });
    } else {
      this.setState({
        editToggle: collaborationId,
      });
    }
  };

  handleShow = (collaborationId) => {
    if (this.state.showCollaboration === collaborationId) {
      this.setState({
        showCollaboration: null,
      });
    } else {
      this.setState({
        showCollaboration: collaborationId,
      });
    }
  };

  handleFave = (title, author, lines, collaborationId) => {
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
    this.handleDelete(collaborationId);
    window.location = "/library";
  };
  handleFilter = (e) => {
    e.preventDefault();
    let poem = e.target.poem.value;
    this.context.handleFilterPoem(poem);
    console.log(this.context.filteredByPoem);
  };
  componentDidMount = () => {
    CollaborationApiService.getCollaboration().then((collaboration) => {
      this.context.getCollaborations(collaboration);
    });
  };
  render() {
    let collaborations = this.context.collaborations;
    if (this.context.filteredByPoem) {
      collaborations = this.context.collaborations.filter(
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
      collaborations = this.context.collaborations;
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
        <div className="poem-item-wrapper">
          <ul>
            {this.context.collaborations.map((collaboration) => (
              <div key={parseInt(Date.now() * Math.random())}>
                <div>
                  <div className="edit-delete">
                    <UserContext.Consumer>
                      {(userContext) => (
                        <div id="left">
                          <button
                            onClick={() => this.handleDelete(collaboration.id)}
                            style={{
                              display:
                                collaboration.author === userContext.user.name
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

                    <button onClick={() => this.handleEdit(collaboration.id)}>
                      <i className="fa fa-edit edit" aria-hidden="true"></i>
                    </button>
                    <button
                      onClick={() =>
                        this.handleFave(
                          collaboration.title,
                          collaboration.author,
                          collaboration.lines,
                          collaboration.id
                        )
                      }
                    >
                      publish
                    </button>
                  </div>
                  {this.state.editToggle === collaboration.id ? (
                    <EditCollaboration
                      title={collaboration.title}
                      author={collaboration.author}
                      lines={collaboration.lines}
                      collaborationId={collaboration.id}
                      handleEdit={this.handleEdit}
                    />
                  ) : null}
                  <button>
                    <h2
                      onClick={() => this.handleShow(collaboration.id)}
                      className="title"
                    >
                      {collaboration.title}
                    </h2>
                  </button>

                  <h3>By {collaboration.author}</h3>
                  <br />
                  {this.state.showCollaboration === collaboration.id ? (
                    !collaboration.lines.includes(",") ? (
                      <p>{collaboration.lines}</p>
                    ) : (
                      collaboration.lines
                        .split(",")
                        .map((p) => (
                          <p key={parseInt(Date.now() * Math.random())}>{p}</p>
                        ))
                    )
                  ) : null}

                  <p>
                    Posted on :{" "}
                    {moment(collaboration.date_created).format("LLL")}
                  </p>
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

export default CollaborationList;
