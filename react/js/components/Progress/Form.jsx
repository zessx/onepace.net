import React from "react";

export default class Form extends React.Component {
	render() {
		return (
			<div className="form-overlay" onClick={e => {
				if(e.target === e.currentTarget) {
					this.props.onClose();
				}
			}}>
				<div className="form-container">
					{this.props.children}
				</div>
			</div>
		);
	}
}
