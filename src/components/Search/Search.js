import { Component } from "react";
import { PoemContext } from "../../contexts/PoemContext";
import "./Search.css";
class Search extends Component {
  static contextType = PoemContext;

  handleSubmit = (e) => {
    e.preventDefault();
    let poet = e.target.poet.value;
    let title = e.target.poem.value;
    // console.log(poet, title);
    if (poet.length && title.length) {
      let baseUrl = "https://poetrydb.org/author,title/";
      fetch(`${baseUrl}${poet};${title}`)
        .then((response) => {
          return response.json();
        })
        .then((poems) => {
          this.context.getPoems(poems);
        });
    }
    if (!title.length) {
      let baseUrl = "https://poetrydb.org/author/";
      fetch(`${baseUrl + poet}`)
        .then((response) => {
          return response.json();
        })
        .then((poems) => {
          this.context.getPoems(poems);
        });
    }
    if (!poet.length) {
      let baseUrl = "https://poetrydb.org/title/";
      fetch(`${baseUrl + title}`)
        .then((response) => {
          return response.json();
        })
        .then((poems) => {
          this.context.getPoems(poems);
        });
    }
  };

  handleAddLib = (poem) => {
    // poem.preventDefault();
    this.context.addLibrary(poem.title);
    // console.log(poem);
  };

  render() {
    let poems = this.context.poems;
    console.log(poems);
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">
              Name of the poet
              <input type="text" name="poet" />
            </label>
          </div>
          <div>
            <label htmlFor="poem">
              Name of the poem
              <input type="text" name="poem" />
            </label>
          </div>
          <input type="submit" value="Submit" />
        </form>
        {}
        {poems.map((poem) => (
          <ul key={poem.lines} name="poem">
            <form onSubmit={this.handleAddLib(poem)}>
              <h1>{poem.title}</h1>
              <h2>{poem.author}</h2>
              <p>{poem.lines}</p>
              <button>fave it</button>

              <input name="poem" type="submit" value="Submit" />
            </form>
          </ul>
        ))}
      </>
    );
  }
}

export default Search;
