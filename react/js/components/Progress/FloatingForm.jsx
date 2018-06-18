import React from "react";

export default class FloatingForm extends React.Component {
	render() {
		return (
			<div className="floating-form">
				{this.props.children}
			</div>
		);
	}
}
