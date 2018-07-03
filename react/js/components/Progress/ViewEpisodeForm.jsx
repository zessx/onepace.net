import React from "react";
import Form from "./Form";
import NetworkHandler from "../../NetworkHandler";
import Moment from "moment";
import { Glyphicon } from "react-bootstrap";

export default class ViewEpisodeForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			issue_create_description: "",
			user: this.props.user,
			issues: [],
			episode: this.props.episode
		};
	}
	componentDidMount() {
		const token = this.state.user != null ? this.state.user.token : "";
		NetworkHandler.get("/list_issues.php", {"token": token, "episode_id": this.state.episode.id}, responseJson => {
			this.setState({issues: responseJson.issues});
		});
	}
	createIssue = description => {
		NetworkHandler.get("/create_issue.php",{
			"token": this.state.user.token,
			"description": description,
			"episode_id": this.state.episode.id
		}, responseJson => {
			const issuesCreated = responseJson.issues.length - this.state.issues.length;
			this.setState({issues:responseJson.issues});
			this.props.onIssueCreated(this.state.episode, issuesCreated);
		}, e => {
			alert("Error: " + e.message);
		});
	}
	deleteIssue = issue => {
		NetworkHandler.get("/delete_issue.php", { "id": issue.id, "token": this.state.user.token }, (responseJson)=>{
			this.setState({issues:responseJson.issues});
			this.props.onIssueDeleted(this.state.episode);
		});
	}
	completeIssue = issue => {
		NetworkHandler.get("/complete_issue.php", { "id": issue.id, "token": this.state.user.token }, (responseJson)=>{
			this.setState({ issues:responseJson.issues });
			this.props.onIssueDeleted(this.state.episode, 1);
		});
	}
	uncompleteIssue = issue => {
		if(!confirm("Are you sure you want to unconfirm this issue?")) {
			return;
		}
		NetworkHandler.get("/uncomplete_issue.php", { "id": issue.id, "token": this.state.user.token }, (responseJson) => {
			this.setState({ issues:responseJson.issues });
			this.props.onIssueCreated(this.state.episode, 1);
		});
	}
	changeIssue = (index, value) => {
		let issues = this.state.issues.slice();
		issues[index] = value;
		this.setState({issues});
	}
	render() {
		const {user} = this.props;
		const isLoggedIn = user != null;
		const isQCer = isLoggedIn && user.role >= 1;
		const isEditor = isLoggedIn && user.role >= 2;
		const isAdmin = isLoggedIn && user.role >= 4;
		return (
			<div>
				<Form onClose={this.props.onClose}>
					<div className="subform-container">
						ID: <input type="text" disabled value={this.state.episode.id} />
						Title: <input type="text" disabled={!isAdmin} value={this.state.episode.title} onChange={e => this.setState({episode:{...this.state.episode,title: e.target.value}})} />
						Part: <input type="number" disabled={!isAdmin} value={this.state.episode.part} onChange={e => this.setState({episode:{...this.state.episode,part: e.target.value}})} />
						Torrent hash: <input type="text" disabled={!isAdmin} value={this.state.episode.torrent_hash} onChange={e => this.setState({episode:{...this.state.episode,torrent_hash: e.target.value}})} />
						CRC-32: <input type="text" disabled={!isAdmin} value={this.state.episode.crc32} onChange={e => this.setState({episode:{...this.state.episode,crc32: e.target.value}})} />
						Chapters: <input type="text" disabled={!isAdmin} value={this.state.episode.chapters} onChange={e => this.setState({episode:{...this.state.episode,chapters: e.target.value}})} />
						Resolution: <input type="text" disabled={!isAdmin} value={this.state.episode.resolution} onChange={e => this.setState({episode:{...this.state.episode,resolution: e.target.value}})} />
						Released date: <input type="text" disabled={!isAdmin} value={this.state.episode.released_date} onChange={e => this.setState({episode:{...this.state.episode,released_date: e.target.value}})} />
						Episodes: <input type="text" disabled={!isAdmin} value={this.state.episode.episodes} onChange={e => this.setState({episode:{...this.state.episode,episodes: e.target.value}})} />
						Status: <input type="text" disabled={!isAdmin} value={this.state.episode.status} onChange={e => this.setState({episode:{...this.state.episode,status: e.target.value}})} />
						{
							isAdmin &&
							<span>Hidden: <input type="checkbox" disabled={!isAdmin} checked={this.state.episode.hidden == 1} onChange={e => this.setState({episode:{...this.state.episode,hidden: e.target.checked ? 1 : 0}})} /></span>
						}
						<br />
						{
							isAdmin &&
							<div className="submit-button" onClick={()=>this.props.onUpdateEpisode(this.state.episode)}>Submit</div>
						}
					</div>
					{
						isAdmin &&
						<div className="subform-container">
							<div className="submit-button" onClick={this.props.onDelete}>Delete episode</div>
						</div>
					}
					{
						isQCer &&
						<div className="subform-container">
							<textarea className="create-issue-input" type="text" value={this.state.issue_create_description} onChange={e => this.setState({issue_create_description: e.target.value})} />
							<div className={"submit-button" + (this.state.issue_create_description.length == 0 ? " disabled" : "")} onClick={()=>this.createIssue(this.state.issue_create_description)}>Create issue</div>
						</div>
					}
					<div className="issues">
						{this.state.issues.map(i => 
							<div key={i.id} className={"subform-container issue-container" + (i.completed ? " completed" : "")}>
								<Glyphicon glyph={i.completed ? "check" : "unchecked"} className={isEditor ? "editable" : ""} onClick={() => isEditor ? i.completed ? this.uncompleteIssue(i) : this.completeIssue(i) : null} />
								<p className="header">
									<span className="name">{i.createdby}</span> <span className="time">{Moment.unix(i.createddate).format("YYYY-MM-DD HH:mm:ss")}</span>
								</p>
								<p className="text">{i.description}</p>
							</div>
						)}
					</div>
				</Form>
			</div>
		);
	}
}
