import React, { Component } from "react";
import Footer from "../Footer/Footer";
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
                <Link to="/drafts"> Write • </Link>
                <Link to="/collaboration">Collaborate • </Link>
                <Link to="library ">Share</Link>
              </h1>
            </div>

            <br />

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
                  <Link to="/drafts">Drafts</Link> is a private place for you to
                  create, edit and delete your pieces.
                </p>
              </div>

              <hr />
              <div className="rules">
                <p>
                  <Link to="/collab">Collab</Link> is a public place accesible
                  to users who are registered. All registered users can edit a
                  collaboration piece. Only the original author of the piece can
                  delete or publish it to the library.
                </p>
              </div>
              <hr />
              <div className="rules">
                <p>
                  <Link to="/library">Library</Link> is a public forum of all
                  pieces that were published by their authors.Accessbile by all
                  users who visit this app.
                </p>
              </div>
            </div>

            <br />
            {/* <div>
              <Link to="/register">Sign up</Link>
              <Link to="/login">Login</Link>
            </div> */}
          </main>
          {/* <div style={{ textAlign: "center" }}>
            <Link className="landing-links" to="/poemlist">
              Drafts
            </Link>
            <Link to="/library" className="landing-links">
              Library
            </Link>

            <Link className="landing-links" to="/collaboration">
              Collaboration Space
            </Link>
          </div> */}
          <footer>
            <Footer />
          </footer>
        </div>
      </>
    );
  }
}
