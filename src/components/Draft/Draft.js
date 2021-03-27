import { Component } from "react";
import Button from "../Button/Button";
import PoemForm from "../PoemForm/PoemForm";
import PoemList from "../PoemList/PoemList";
import UserContext from "../../contexts/UserContext";

class Draft extends Component {
  static contextType = UserContext;
  // state = {
  //   toggleForm: false,
  //   buttonToggle: false,
  // };
  // handleClick = () => {
  //   this.setState({
  //     toggleForm: !this.state.toggleForm,
  //     buttonToggle: !this.state.buttonToggle,
  //   });
  // };
  // handleCancel = () => {
  //   this.setState({
  //     buttonToggle: !this.state.buttonToggle,
  //   });
  //   window.location = "/poemlist";
  // };
  render() {
    return (
      <>
        {this.context.toggleForm ? (
          <PoemForm
            user={this.context.user.name}
            handleClick={this.context.handleClick}
            handleCancel={this.context.handleCancel}
          />
        ) : null}
        <PoemList
          handleClick={this.context.handleClick}
          // buttonToggle={this.state.buttonToggle}
        />
      </>
    );
  }
}

export default Draft;
