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
              <h1>Inspire and Get Inspired</h1>
            </div>
            <div>
              <p></p>
            </div>
            <br />
          </main>
          <div className="landing-links">
            <Link to="/library">Global Library</Link>
            <Link to="/poemlist">Drafts</Link>
          </div>
          <footer>
            <Footer />
          </footer>
        </div>
      </>
    );
  }
}
