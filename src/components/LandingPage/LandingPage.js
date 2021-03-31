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
            <div className="landing-lines">
              <p>
                Poetlandia is a free platform for creating and sharing
                interesting collection of words.
              </p>
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
