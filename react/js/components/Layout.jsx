import React from "react";
import "../../index.scss";
import "babel-polyfill";

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <div className="topnav bottom-shadow">
          <a href="/#/"><img className="logo" src="assets/Logo.png" /></a>
          <a className="link" href="/#/Torrents">Torrents</a>
          <a className="link" href="/#/About">About</a>
        </div>
        {this.props.children}
      </div>
    );
  }
}
