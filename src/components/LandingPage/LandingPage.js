import React, { Component } from "react";
// import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";

export default class LandingPage extends Component {
  state = { hasError: false };

  render() {
    const { hasError } = this.state;
    return (
      <>
        <div>
          <main>
            {hasError && <p>There was an error! Oh no!</p>}
            <br />
            <div className="inspire">
              <h1>
                {" "}
                <Link style={{ color: " rgb(175, 172, 172)" }} to="/drafts">
                  {" "}
                  Write{" "}
                </Link>
                •{" "}
                <Link
                  style={{ color: " rgb(175, 172, 172)" }}
                  to="/collaboration"
                >
                  Collaborate{" "}
                </Link>
                •{" "}
                <Link style={{ color: " rgb(175, 172, 172)" }} to="library ">
                  Share
                </Link>
              </h1>
            </div>

            <br />
            <hr />
            <div className="rules-wrapper">
              <div className="rules first">
                <p>
                  Poetlandia is a free platform for creating and sharing
                  interesting collection of words.
                </p>
              </div>
              <br />
              <hr />
              <div className="rules">
                <p>
                  <Link style={{ color: "gray" }} to="/drafts">
                    Drafts{" "}
                  </Link>
                  is a private place for you to create, edit and delete your
                  pieces.
                </p>
              </div>

              <hr />
              <div className="rules">
                <p>
                  <Link style={{ color: "gray" }} to="/collaboration">
                    Collab{" "}
                  </Link>
                  is a public place accessible to users who are registered. All
                  registered users can edit a collaboration piece. Only the
                  original author of the piece can delete or publish it to the
                  library.
                </p>
              </div>
              <hr />
              <div className="rules">
                <p>
                  <Link style={{ color: "gray" }} to="/library">
                    Library
                  </Link>{" "}
                  is a public forum of all pieces that were published by their
                  authors.Accessible by all users who visit this app.
                </p>
              </div>
            </div>

            <br />
          </main>
        </div>
      </>
    );
  }
}
