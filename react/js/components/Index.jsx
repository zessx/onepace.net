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
import Posts from "./Posts";
import Watch from "./Watch";
import About from "./About";

export default class Index extends React.Component {
  render() {
    return (
      <Layout>
        <div className="logo">
          <img src="assets/Logo.png" />
        </div>
        <Posts />
      </Layout>
    );
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/">
      <IndexRoute component={Index} />
      <Route path="watch" component={Watch} />
      <Route path="about" component={About} />
    </Route>
  </Router>,
  document.getElementById("reactentry")
);
