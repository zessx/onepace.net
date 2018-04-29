import React from 'react';
import '../../index.scss';
import 'babel-polyfill';
import Watch from './Watch';
import About from './About';
import Posts from './Posts';

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
