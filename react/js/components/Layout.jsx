import React from "react";
import "../../index.scss";
import "babel-polyfill";

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <div className="menu">
          <a href="/#/">Home</a>
          <a href="/#/about">About</a>
          <a href="/#/watch">Watch</a>
        </div>
        {this.props.children}
      </div>
    );
  }
}
