import { Component } from "react";
import { PoemContext } from "../../contexts/PoemContext";

class Library extends Component {
  static contextType = PoemContext;
  render() {
    return (
      <>
        <h1>Your favorite poems</h1>

        <>
          <ul key={this.context.library}>
            <h1>{this.context.library}</h1>
          </ul>
        </>
      </>
    );
  }
}

export default Library;
