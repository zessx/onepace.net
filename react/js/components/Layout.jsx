import React from "react";
import Side from "./Side";

export default class Layout extends React.Component {
	render() {
		return (
			<div>
				<div className="topnav bottom-shadow">
					<a href="/#/"><img className="logo" src="assets/Logo.png" /></a>
					<a className="link" href="/#/about">About</a>
					<a className="link" href="/#/donate">Donate</a>
				</div>
				<div className="layout-container">
					<div className="main-content">
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}
