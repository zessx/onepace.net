import React from "react";
import ReactDOM from "react-dom";
import {
  Router,
  Route,
  hashHistory,
  IndexRoute,
} from "react-router";
import "../../index.scss";
import "babel-polyfill";
import Layout from "./Layout";
import Watch from "./Watch";
import About from "./About";
import ReleaseList from "./ReleaseList";

export default class Index extends React.Component {
  componentDidMount() {
    document.title = "One Pace | Home";
  }
  render() {
    return (
      <div>
        <Layout>
          <div className="header">
            <div className="logo">
              <img src="assets/Logo.png" />
            </div>
          </div>
          <About />
        </Layout>
      </div>
    );
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/">
      <IndexRoute component={Index} />
      <Route name="watch" path="/watch(?episode=:episode)" component={Watch} />
    </Route>
  </Router>,
  document.getElementById("reactentry")
);
