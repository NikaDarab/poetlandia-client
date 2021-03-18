import React, { Component } from "react";
import { PoemContext } from "../../contexts/PoemContext";
import PoemApiService from "../../services/poem-api-service";
import EditPoem from "./EditPoem";
import "./PoemList.css";
class PoemList extends Component {
  state = {
    editToggle: false,
  };
  static contextType = PoemContext;

  handleDelete = (poemId) => {
    // console.log(poemId);
    this.context.deletePoem(poemId);
    PoemApiService.deletePoem(poemId);
  };

  handleEdit = () => {
    this.setState({
      editToggle: !this.state.editToggle,
    });
    console.log(this.state.editToggle);
  };
  componentDidMount = () => {
    PoemApiService.getPoem().then((poem) => {
      this.context.getPoems(poem);
      //   console.log(this.context.poems);
    });
  };
  render() {
    return (
      <>
        <h2>List of poems</h2>
        <div>
          <ul>
            {this.context.poems.map((poem) => (
              <div className="poem-item" key={poem.lines}>
                <h2>Title :{poem.title}</h2>
                <h3>Author :{poem.author}</h3>
                <p>Poem: {poem.lines}</p>
                <button onClick={() => this.handleDelete(poem.id)}>
                  Delete
                </button>
                <button onClick={this.handleEdit}>Edit</button>
                {this.state.editToggle ? (
                  <EditPoem
                    title={poem.title}
                    author={poem.author}
                    lines={poem.lines}
                    poemId={poem.id}
                    handleEdit={this.handleEdit}
                  />
                ) : null}
              </div>
            ))}
          </ul>
        </div>
      </>
    );
  }
}

export default PoemList;
