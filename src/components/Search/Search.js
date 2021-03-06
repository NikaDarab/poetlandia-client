import { Component } from "react";
import { SearchContext } from "../../contexts/SearchContext";
import Display from "./Display";
class Search extends Component {
  state = {
    formSubmitted: false,
  };
  static contextType = SearchContext;

  handleSubmit = (e) => {
    this.setState({
      formSubmitted: !this.state.formSubmitted,
    });
    e.preventDefault();
    let poet = e.target.poet.value;
    let title = e.target.poem.value;
    // console.log(poet, title);
    if (poet.length && title.length) {
      let baseUrl = "https://poetrydb.org/author,title/";

      fetch(`${baseUrl}${poet};${title}`)
        .then((res) => {
          if (!res.ok) {
            alert("no results :-(");
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
          if (!response.ok) {
            alert("did not  find ot");
          }
          return response.json();
        })
        .then((poems) => {
          return poems.length ? this.context.getPoems(poems) : null;
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

  renderSearchBar = () => {
    return (
      <div className="search-bar">
        <form onSubmit={this.handleSubmit}>
          {console.log(this.state.formSubmitted)}
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
          <input type="submit" value="Search" />
        </form>
      </div>
    );
  };

  render() {
    let poems = this.context.poems;
    console.log(poems);
    return (
      <>
        {this.renderSearchBar()}
        {!this.context.poems && this.state.formSubmitted ? (
          <p>no results, try again!</p>
        ) : this.context.poems ? (
          <Display poems={this.context.poems} />
        ) : null}
        {}

        {/* : null} */}
      </>
    );
  }
}

export default Search;
