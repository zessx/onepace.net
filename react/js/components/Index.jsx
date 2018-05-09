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
  render() {
    return (
      <div>
        <Layout>
          <div className="logo">
            <img src="assets/Logo.png" />
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
      <Route name="releaselist" path="/releaselist" component={ReleaseList} />
    </Route>
  </Router>,
  document.getElementById("reactentry")
);
