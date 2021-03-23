import { Component } from "react";
import PoemApiService from "../../services/poem-api-service";
import { PoemContext } from "../../contexts/PoemContext";
class PoemForm extends Component {
  static contextType = PoemContext;
  handleSubmit = (e) => {
    e.preventDefault();
    let poem = {
      title: e.target.title.value,
      author: this.props.user,
      lines: e.target.lines.value.split(","),
      date_created: new Date().toLocaleString(),
    };
    PoemApiService.postPoem(poem).then((poem) => this.context.addPoems(poem));
    console.log(this.context.poems);

    this.props.handleClick();
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ul>
          <li>
            <label htmlFor="title">
              <b>Title</b>
              <br />
              <span className="required">*</span>
            </label>
            <input
              className="field-long"
              type="text"
              placeholder="Sonnet"
              name="title"
              required
            />
          </li>
          <br />
          {/* <li>
            <label htmlFor="author">
              <b>Author</b>
              <br />
              <span className="required">*</span>
            </label>
            <input
              className="field-long"
              type="text"
              name="author"
              placeholder={"shakespear"}
              required
            />
          </li> */}
          <br />
          <li>
            <label htmlFor="lines">
              <b>Poem</b>
              <br />
              <span className="required">*</span>
            </label>
            <textarea
              className="field-long"
              name="lines"
              placeholder="a simple poem"
              required
            />
          </li>
          <br />
        </ul>
        <button>Add</button>
      </form>
    );
  }
}

export default PoemForm;
