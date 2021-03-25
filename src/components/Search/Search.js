import { Component } from "react";
import { PoemContext } from "../../contexts/PoemContext";
import Display from "./Display";
class Search extends Component {
  state = {
    // resultToggle: false,
  };
  static contextType = PoemContext;

  handleSubmit = (e) => {
    e.preventDefault();
    let poet = e.target.poet.value;
    let title = e.target.poem.value;
    // console.log(poet, title);
    if (poet.length && title.length) {
      let baseUrl = "https://poetrydb.org/author,title/";
      fetch(`${baseUrl}${poet};${title}`)
        .then((res) => {
          if (!res.ok) {
            return res.json().then((e) => Promise.reject(e));
          }

          return res.json().then((poem) => poem);
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
    // this.setState({
    //   resultToggle: !this.state.resultToggle,
    // });
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
        {/* {this.state.resultToggle ? */}
        <Display poems={poems} />

        {/* : null} */}
      </>
    );
  }
}

export default Search;
