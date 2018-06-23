import React from "react";

export default class Form extends React.Component {
	render() {
		return (
			<div className="progress-form-overlay">
				<div className="progress-form-container">
					{this.props.children}
				</div>
			</div>
		);
	}
}
