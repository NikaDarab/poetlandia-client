import { Component } from "react";
import Button from "../Button/Button";
import PoemForm from "../PoemForm/PoemForm";
import PoemList from "../PoemList/PoemList";

class Draft extends Component {
  state = {
    toggleForm: false,
  };
  handleClick = () => {
    this.setState({
      toggleForm: !this.state.toggleForm,
    });
  };
  render() {
    return (
      <>
        <h1>Your Drafts</h1>

        <Button onClick={this.handleClick} type="submit">
          Add a poem
        </Button>
        {this.state.toggleForm ? (
          <PoemForm handleClick={this.handleClick} />
        ) : null}
        <PoemList />
      </>
    );
  }
}

export default Draft;
