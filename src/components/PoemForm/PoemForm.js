import { Component } from "react";
import PoemApiService from "../../services/poem-api-service";
import { PoemContext } from "../../contexts/PoemContext";
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
                title
                <br />
              </label>
              <div className="title-input">
                <input type="text" placeholder="title" name="title" required />
              </div>
            </li>

            <br />
            <li>
              <label htmlFor="lines">
                content
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
            </li>
            <br />
          </ul>
          <button>Add</button>
          <br />
          <button onClick={this.handleCancel}>cancel</button>
        </form>
      </div>
    );
  }
}

export default PoemForm;
