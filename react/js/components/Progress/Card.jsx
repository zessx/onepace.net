import React from "react";

export default class Card extends React.Component {
	render() {
		return (
			<div>
				{
					this.props.title &&
					<div className="progress-card title" onClick={this.props.onView}>
						<div className="text">{this.props.title}</div>
					</div> ||
					this.props.img &&
					<div className="progress-card">
						<img className="list-image" src={this.props.img} />
					</div>
				}
			</div>
		);
	}
}
