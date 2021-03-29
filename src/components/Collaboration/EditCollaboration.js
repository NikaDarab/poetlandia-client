import React, { Component } from "react";
import { PoemContext } from "../../contexts/PoemContext";

import CollaborationApiService from "../../services/collaboration-api-service";
import moment from "moment";

class EditPoem extends Component {
  static contextType = PoemContext;

  handleEdit = (e) => {
    e.preventDefault();
    let newPoem = {
      title: e.target.title.value,
      author: e.target.author.value,
      lines: e.target.lines.value.split(","),
      date_created: moment().format("LLL"),
    };
    let collaborationId = this.props.collaborationId;
    CollaborationApiService.editCollaboration(
      newPoem,
      this.props.collaborationId
    ).then(() => this.context.editCollaboration(collaborationId, newPoem));
    // this.props.handleEdit();
  };
  render() {
    return (
      <form onSubmit={this.handleEdit}>
        <ul>
          <li>
            <label htmlFor="title">
              <b>Title</b>
              <br />
              <span className="required">*</span>
            </label>
            <input
              className="title-input"
              type="text"
              placeholder={this.props.title}
              defaultValue={this.props.title}
              name="title"
              required
            />
          </li>
          <br />
          <li>
            <label htmlFor="author">
              <b>Author</b>
              <br />
              <span className="required">*</span>
            </label>
            <input
              className=" title-input"
              type="text"
              name="author"
              placeholder={this.props.author}
              value={this.props.author}
              readOnly="readonly"
            />
          </li>
          <br />
          <li>
            <label htmlFor="lines">
              <b>poem</b>
              <br />
              <span className="required">*</span>
            </label>
            <textarea
              className="lines-input"
              name="lines"
              placeholder={this.props.lines}
              defaultValue={this.props.lines}
              required
            />
          </li>
          <br />
        </ul>
        <button>Submit</button>
      </form>
    );
  }
}

export default EditPoem;
