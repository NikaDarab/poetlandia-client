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

  handlePublish = (title, author, lines, collaborationId) => {
    // console.log("faved");
    let collaboration = {
      title: title,
      author: author,
      lines: lines,
      date_created: moment().format("LLL"),
    };
    LibraryApiService.postLibrary(collaboration).then((collaboration) =>
      this.context.addLibrary(collaboration)
    );
    this.handleDelete(collaborationId);
    this.props.history.push("/library");
  };
  handleFilter = (e) => {
    e.preventDefault();
    let poem = e.target.poem.value;
    this.context.handleFilterPoem(poem);
    // console.log(this.context.filteredByPoem);
  };
  componentDidMount = () => {
    CollaborationApiService.getCollaboration().then((collaboration) => {
      let newCollaboration = collaboration.map((collab) => ({
        ...collab,
        lines: collab.lines.split(","),
      }));
      this.context.getCollaborations(newCollaboration);
    });
  };
  render() {
    let collaborations = this.context.collaborations;
    console.log(collaborations);
    if (this.context.filteredByPoem) {
      collaborations = this.context.collaborations.filter(
        (collaboration) =>
          collaboration.title
            .toLowerCase()
            .includes(this.context.filteredByPoem.toLowerCase()) ||
          collaboration.author
            .toLowerCase()
            .includes(this.context.filteredByPoem.toLowerCase()) ||
          collaboration.lines.includes(this.context.filteredByPoem)
      );
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
            {collaborations.map((collaboration) => (
              <div key={parseInt(Date.now() * Math.random())}>
                <div>
                  <div className="edit-delete">
                    {/* <div style={{ float: "left" }}>
                      <button onClick={() => this.handleEdit(collaboration.id)}>
                        <i className="fa fa-edit edit" aria-hidden="true"></i>
                      </button>
                    </div> */}
                    <UserContext.Consumer>
                      {(userContext) => (
                        <div>
                          <div style={{ float: "left" }}>
                            <button
                              onClick={() =>
                                this.handleDelete(collaboration.id)
                              }
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
                          <div style={{ float: "left" }}>
                            <button
                              onClick={() => this.handleEdit(collaboration.id)}
                            >
                              <i
                                className="fa fa-edit edit"
                                aria-hidden="true"
                              ></i>
                            </button>
                          </div>
                          <div>
                            <button
                              onClick={() =>
                                this.handlePublish(
                                  collaboration.title,
                                  collaboration.author,
                                  collaboration.lines,
                                  collaboration.id
                                )
                              }
                              style={{
                                display:
                                  collaboration.author === userContext.user.name
                                    ? "block"
                                    : "none",
                              }}
                            >
                              <div
                                style={{ fontSize: "100%" }}
                                className="edit"
                              >
                                publish
                              </div>
                            </button>
                          </div>
                        </div>
                      )}
                    </UserContext.Consumer>
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
                      style={{ textAlign: "left" }}
                      onClick={() => this.handleShow(collaboration.id)}
                    >
                      {collaboration.title}
                    </h2>
                  </button>

                  <h3 style={{ textAlign: "left" }}>
                    By {collaboration.author}
                  </h3>
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
