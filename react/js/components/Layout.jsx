import React from "react";
import "../../index.scss";
import "babel-polyfill";
import Side from "./Side";

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <div>
          <div className="topnav bottom-shadow">
            <a href="/#/"><img className="logo" src="assets/Logo.png" /></a>
            <a className="link" href="/#/Torrents">Torrents</a>
            <a className="link" href="/#/About">About</a>
          </div>
          <Side />
        </div>
        {this.props.children}
      </div>
    );
  }
}
