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
				<Form>
					<label>Old password: <input type="password" value={this.state.oldpassword} onChange={e => this.setState({oldpassword: e.target.value})} /></label>
					<label>New password: <input type="password" value={this.state.newpassword} onChange={e => this.setState({newpassword: e.target.value})} /></label>
					<div onClick={()=>this.props.onSubmit(this.state)}>Submit</div>
				</Form>
			</div>
		);
	}
}
