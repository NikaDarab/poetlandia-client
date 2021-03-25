import { Component } from "react";

class Display extends Component {
  state = {
    toggle: false,
  };

  handleToggle = () => {
    this.setState({
      toggle: !this.state.toggle,
    });
  };

  displayPoem = () => {
    return (
      <>
        {this.props.poems.map((poem) => (
          <ul key={poem.title}>
            <li>
              {/* <button>fave it</button> */}
              <h3>{poem.title}</h3>
              <button onClick={this.handleToggle}>see</button>
              {this.state.toggle
                ? poem.lines.map((line) => (
                    <p key={parseInt(Date.now() * Math.random())}>{line}</p>
                  ))
                : null}
            </li>
          </ul>
        ))}
      </>
    );
  };
  render() {
    return <>{this.displayPoem()}</>;
  }
}

export default Display;
