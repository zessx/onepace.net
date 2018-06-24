import React from "react";
import Form from "./Form";

export default class ChangePasswordForm extends React.Component {
	state = {
		"oldpassword":"",
		"newpassword":""
	}
	render() {
		return (
			<div>
				<Form onClose={this.props.onClose}>
					Old password: <input type="password" value={this.state.oldpassword} onChange={e => this.setState({oldpassword: e.target.value})} />
					New password: <input type="password" value={this.state.newpassword} onChange={e => this.setState({newpassword: e.target.value})} />
					<div className="submit-button" onClick={()=>this.props.onSubmit(this.state)}>Submit</div>
				</Form>
			</div>
		);
	}
}
