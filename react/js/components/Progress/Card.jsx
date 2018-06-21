import React from "react";
import { Glyphicon } from "react-bootstrap";

export default class Card extends React.Component {
	render() {
		return (
			<div className="progress-card">
				{this.props.title && <div className="text">{this.props.title}</div>}
				{this.props.img && <img className="list-image" src={this.props.img} />}
				{this.props.onEditCardButtonClick && <Glyphicon glyph="pencil" onClick={this.props.onEditCardButtonClick} />}
			</div>
		);
	}
}
