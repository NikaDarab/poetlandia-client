import { Component } from "react";
import Button from "../Button/Button";
import PoemForm from "../PoemForm/PoemForm";
import PoemList from "../PoemList/PoemList";
import UserContext from "../../contexts/UserContext";

class Draft extends Component {
  static contextType = UserContext;
  state = {
    toggleForm: false,
    buttonToggle: false,
  };
  handleClick = () => {
    this.setState({
      toggleForm: !this.state.toggleForm,
      buttonToggle: !this.state.buttonToggle,
    });
  };
  handleCancel = () => {
    this.setState({
      buttonToggle: !this.state.buttonToggle,
    });
    window.location = "/poemlist";
  };
  render() {
    return (
      <>
        {this.state.toggleForm ? (
          <PoemForm
            user={this.context.user.name}
            handleClick={this.handleClick}
            handleCancel={this.handleCancel}
          />
        ) : null}
        <PoemList
          handleClick={this.handleClick}
          buttonToggle={this.state.buttonToggle}
        />
      </>
    );
  }
}

export default Draft;
