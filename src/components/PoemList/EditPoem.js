import React, { Component } from "react";
import { PoemContext } from "../../contexts/PoemContext";
import { UserContext } from "../../contexts/UserContext";
import PoemApiService from "../../services/poem-api-service";
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
    let poemId = this.props.poemId;
    PoemApiService.editPoem(newPoem, this.props.poemId).then(() =>
      this.context.editPoem(poemId, newPoem)
    );
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
              Value={this.props.author}
              readonly="readonly"
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
