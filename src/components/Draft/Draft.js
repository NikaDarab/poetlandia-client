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
  render() {
    return (
      <>
        {/* <h1>Your Drafts</h1> */}

        {/* <button
          className="circle"
          onClick={this.handleClick}
          type="submit"
        ></button> */}
        {/* <div className="circle"></div> */}
        {this.state.toggleForm ? (
          <PoemForm
            user={this.context.user.name}
            handleClick={this.handleClick}
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
