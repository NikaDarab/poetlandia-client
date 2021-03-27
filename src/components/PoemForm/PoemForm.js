import { Component } from "react";
import PoemApiService from "../../services/poem-api-service";
import { PoemContext } from "../../contexts/PoemContext";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import moment from "moment";
import { Input, Required, Label } from "../Form/Form";
class PoemForm extends Component {
  static contextType = PoemContext;
  handleSubmit = (e) => {
    e.preventDefault();
    let poem = {
      title: e.target.title.value,
      author: this.props.user,
      lines: e.target.lines.value.split(","),
      date_created: moment().format("LLL"),
    };
    PoemApiService.postPoem(poem).then((poem) => this.context.addPoems(poem));
    console.log(this.context.poems);

    this.props.handleClick();
  };

  handleCancel = () => {
    this.props.handleClick();
  };

  render() {
    return (
      <div className="poem-form">
        <form onSubmit={this.handleSubmit}>
          <ul>
            <li>
              <label htmlFor="title">
                <button className="delete-button" onClick={this.handleCancel}>
                  {" "}
                  <i className="far fa-times-circle fa-2x"></i>
                </button>
                Title
                <br />
              </label>
              <div className="title-input">
                <input type="text" placeholder="title" name="title" required />
              </div>
            </li>

            <br />
            <li>
              <label htmlFor="lines">
                Content
                <br />
              </label>
              <div>
                <textarea
                  className="lines-input"
                  name="lines"
                  placeholder="poem,story..."
                  required
                />
              </div>
              <button className="add-button">
                {" "}
                <i className="fas fa-plus-circle fa-2x"></i>
              </button>
            </li>
            <br />
          </ul>
        </form>
      </div>
    );
  }
}

export default PoemForm;
