import React from "react";

export default class Form extends React.Component {
	render() {
		return (
			<div className="progress-form-overlay">
				<form className="progress-form-container" onSubmit={this.props.onSubmit}>
					{this.props.children}
					<div onClick={this.props.onSubmit}>Submit</div>
				</form>
			</div>
		);
	}
}
