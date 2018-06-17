import React from "react";

export default class Card extends React.Component {
	render() {
		return (
			<div className="progress-card">
				{this.props.title}
			</div>
		);
	}
}
