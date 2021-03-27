import { Component } from "react";

class Display extends Component {
  state = {
    toggle: false,
    showPoem: false,
  };
  handleShow = (poemTitle) => {
    if (this.state.showPoem === poemTitle) {
      this.setState({
        showPoem: null,
      });
    } else {
      this.setState({
        showPoem: poemTitle,
      });
    }
  };
  handleToggle = () => {
    this.setState({
      toggle: !this.state.toggle,
    });
  };

  displayPoem = () => {
    return (
      <>
        <div className="poem-item-wrapper" style={{ margin: "20px 0" }}>
          <ul>
            {this.props.poems.map((poem) => (
              <div key={parseInt(Date.now() * Math.random())}>
                <div>
                  <button onClick={() => this.handleShow(poem.title)}>
                    <h2 className="title">{poem.title}</h2>
                  </button>
                  <h3 className="author">By {poem.author}</h3>
                  <br />

                  {this.state.showPoem === poem.title ? (
                    !poem.lines.includes(",") ? (
                      <p className="lines">{poem.lines}</p>
                    ) : (
                      poem.lines.split(",").map((p) => (
                        <p
                          className="lines"
                          key={parseInt(Date.now() * Math.random())}
                        >
                          {p}
                        </p>
                      ))
                    )
                  ) : null}

                  <hr />
                  <br />
                </div>
              </div>
            ))}
          </ul>
        </div>
      </>
    );
  };
  render() {
    return <>{this.displayPoem()}</>;
  }
}

export default Display;
