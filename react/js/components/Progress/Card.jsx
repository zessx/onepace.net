import React from "react";

export default class Card extends React.Component {
	render() {
		return (
			<div>
				{
					this.props.title &&
					<div className={"progress-card title" + (this.props.unreleased ? " unreleased" : "") + (this.props.admin_only ? " admin-only" : "")} onClick={this.props.onView}>
						<div className="text">{this.props.title}</div>
						{ this.props.status1 && this.props.status1.length > 0 && <div className="status">{this.props.status1}</div> }
						{ this.props.status2 && this.props.status2.length > 0 && <div className="status">{this.props.status2}</div> }
						{ this.props.status3 && this.props.status3.length > 0 && <div className="status">{this.props.status3}</div> }
						{ this.props.status4 && this.props.status4.length > 0 && <div className="status">{this.props.status4}</div> }
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
