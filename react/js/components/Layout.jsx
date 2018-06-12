import React from "react";
import Side from "./Side";
import SideMinimised from "./SideMinimised";
import LocalStorageUtils from "../LocalStorageUtils";

export default class Layout extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			sideMinimised: LocalStorageUtils.getSidebarToggled()
		};
		this.toggleSide = this.toggleSide.bind(this);
	}

	toggleSide = (e) => {
		e.preventDefault();
		LocalStorageUtils.setSidebarToggled(!this.state.sideMinimised);
		this.setState({ sideMinimised: !this.state.sideMinimised });
	}

	render() {
		return (
			<div>
				<div className="topnav bottom-shadow">
					<a href="/#/"><img className="logo" src="assets/Logo.png" /></a>
					<a className="link" href="/#/Torrents">Torrents</a>
					<a className="link" href="/#/About">About</a>
				</div>
				<div className="layout-container">
					{this.state.sideMinimised ? <SideMinimised toggle={this.toggleSide} /> : <Side toggle={this.toggleSide} />}
					<div className="layout-content">
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}
