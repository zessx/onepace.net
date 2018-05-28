import React from "react";
import "../../index.scss";
import "babel-polyfill";

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <div className="topnav">
          <a href="/#/">Home</a>
          <a href="/#/Watch">Watch</a>
        </div>
        {this.props.children}
      </div>
    );
  }
}
