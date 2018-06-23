import React from "react";
import Form from "./Form";
import NetworkHandler from "../../NetworkHandler";

export default class ViewEpisodeForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.episode.id,
			issue_create_description: "",
			"user": this.props.user
		};
	}
	componentDidMount() {
		super.componentDidMount();
		NetworkHandler.get("/list_issues.php", {"episode_id": this.state.id}, (responseJson)=>{
			this.setState({issues: responseJson.issues});
		});
	}
	createIssue = (description) => {
		NetworkHandler.get("/create_issue.php",{
			"token": this.state.user.token,
			"description": description,
			"episode_id": this.state.id
		}, (responseJson)=>{
			this.setState({issues:responseJson.issues});
		});
	}
	updateIssue = (issue)=>{
		NetworkHandler.get("/update_issue.php",{
			"token": this.state.user.token,
			...issue
		}, (responseJson)=>{
			this.setState({issues:responseJson.issues});
		});
	}
	deleteIssue = (issue) => {
		NetworkHandler.get("/delete_issue.php", { "id": issue.id, "token": this.state.user.token }, (responseJson)=>{
			this.setState({issues:responseJson.issues});
		});
	}
	render() {
		const isLoggedIn = this.props.user != null;
		const isQCer = isLoggedIn && this.props.user.role >= 1;
		const isAdmin = isLoggedIn && this.props.user.role >= 2;
		return (
			<div>
				<Form>
					{isAdmin &&<div onClick={this.props.onDelete}>Delete episode</div>}
					{isQCer&&<div>
						<input type="text" value={this.state.issue_create_description} onChange={e => this.setState({issue_create_description: e.target.value})} />
						<div onClick={()=>this.createIssue(this.state.issue_create_description)}>Create issue</div>
					</div>}
					<div className="issues">
						{this.state.issues.map(i => 
							<div key={i.id} className="issue">
								<input type="checkbox" disabled={!isQCer} value={i.status == 2} onChange={e => this.updateIssue({...i, "status": e.target.value ? 2 : 1})} />
								<input type="text" disabled={!isQCer} value={i.description} onSubmit={e => this.updateIssue({...i, "description": e.target.value})} />
								{isQCer&&<div onClick={()=>this.deleteIssue(i)}>Delete</div>}
							</div>
						)}
					</div>
				</Form>
			</div>
		);
	}
}
