import React from "react";
import Form from "./Form";
import NetworkHandler from "../../NetworkHandler";
import Moment from "moment";

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
		NetworkHandler.get("/list_issues.php", {"episode_id": this.state.episode.id}, responseJson => {
			this.setState({issues: responseJson.issues});
		});
	}
	createIssue = description => {
		NetworkHandler.get("/create_issue.php",{
			"token": this.state.user.token,
			"description": description,
			"episode_id": this.state.episode.id
		}, responseJson => {
			this.setState({issues:responseJson.issues});
		}, e => {
			alert("Error: " + e.message);
		});
	}
	updateIssue = issue => {
		NetworkHandler.get("/update_issue.php",{
			"token": this.state.user.token,
			...issue
		}, responseJson => {
			this.setState({issues:responseJson.issues});
		});
	}
	deleteIssue = issue => {
		NetworkHandler.get("/delete_issue.php", { "id": issue.id, "token": this.state.user.token }, (responseJson)=>{
			this.setState({issues:responseJson.issues});
		});
	}
	changeIssue = (index, value) => {
		let issues = this.state.issues.slice();
		issues[index] = value;
		this.setState({issues});
	}
	render() {
		const isLoggedIn = this.props.user != null;
		const isQCer = isLoggedIn && this.props.user.role >= 1;
		const isAdmin = isLoggedIn && this.props.user.role >= 2;
		return (
			<div>
				<Form onClose={this.props.onClose}>
					<div className="subform-container">
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
							<input type="text" value={this.state.issue_create_description} onChange={e => this.setState({issue_create_description: e.target.value})} />
							<div className={"submit-button left-margin" + (this.state.issue_create_description.length == 0 ? " disabled" : "")} onClick={()=>this.createIssue(this.state.issue_create_description)}>Create issue</div>
						</div>
					}
					<div className="issues">
						{this.state.issues.map((i, index) => 
							<div key={i.id} className="subform-container">
								<input type="checkbox" disabled={!isQCer} value="test" checked={i.status == 1} onChange={e => this.updateIssue({...i, status: e.target.checked ? 1 : 0})} />
								<input className="left-margin" type="text" disabled={!isQCer} value={i.description} onChange={e=>this.changeIssue(index, {...i, description: e.target.value})} />
								<span className="left-margin">Created by {i.createdby} {Moment.unix(i.createddate).format("YYYY-MM-DD HH:mm:ss")}</span>
								{ isQCer && <div className="submit-button left-margin" onClick={()=>this.updateIssue(i)}>Update</div> }
								{ isQCer && <div className="submit-button left-margin" onClick={()=>this.deleteIssue(i)}>Delete</div> }
								{i.status == 1 && <span className="left-margin">Marked complete by {i.completedby} {Moment.unix(i.completeddate).format("YYYY-MM-DD HH:mm:ss")}</span>}
							</div>
						)}
					</div>
				</Form>
			</div>
		);
	}
}
