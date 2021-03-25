import { Component } from "react";
import Button from "../Button/Button";
import PoemForm from "../PoemForm/PoemForm";
import PoemList from "../PoemList/PoemList";
import UserContext from "../../contexts/UserContext";

class Draft extends Component {
  static contextType = UserContext;
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
        {/* <h1>Your Drafts</h1> */}

        <div className="circle" onClick={this.handleClick} type="submit">
          {" "}
        </div>
        {/* <div className="circle"></div> */}
        {this.state.toggleForm ? (
          <PoemForm
            user={this.context.user.name}
            handleClick={this.handleClick}
          />
        ) : null}
        <PoemList />
      </>
    );
  }
}

export default Draft;
