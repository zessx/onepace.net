import React from "react";
import Form from "./Form";

export default class CreateUserForm extends React.Component {
	state = {
		"role":0,
		"name":"",
		"password":"",
	}
	render() {
		return (
			<div>
				<Form onClose={this.props.onClose}>
					Name: <input type="text" value={this.state.name} onChange={e => this.setState({name: e.target.value})} />
					Password: <input type="password" value={this.state.password} onChange={e => this.setState({password: e.target.value})} />
					Role: <input type="number" value={this.state.role} onChange={e => this.setState({role: e.target.value})} />
					<div className={"submit-button" + ((this.state.name.length == 0 || this.state.password.length == 0 || this.state.role < 0) ? " disabled" : "")} onClick={()=>this.props.onSubmit(this.state)}>Create user</div>
				</Form>
			</div>
		);
	}
}
