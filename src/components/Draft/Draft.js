import { Component } from "react";
import PoemForm from "../PoemForm/PoemForm";
import PoemList from "../PoemList/PoemList";
import UserContext from "../../contexts/UserContext";

class Draft extends Component {
  static contextType = UserContext;

  render() {
    // console.log(this.props);
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
          history={this.props.history}
          // buttonToggle={this.state.buttonToggle}
        />
      </>
    );
  }
}

export default Draft;
