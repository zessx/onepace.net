import React, { Component } from "react";
import { Glyphicon } from "react-bootstrap";

export default class Side extends Component {
	render() {
		return (
			<div className="side-minimised">
				<h5 className="pull-right side-toggle" onClick={this.props.toggle}>
					<Glyphicon glyph="triangle-right"/>
				</h5>
			</div>
		);
	}
}
