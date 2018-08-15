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
			episodeattachments: [],
			episode: this.props.episode,
			createdAttachment: null,
			uploadingAttachment: false,
			attachmentUploadProgress: 0.0,
			updatingEpisode: false
		};
	}
	componentDidMount() {
		const token = this.state.user != null ? this.state.user.token : "";
		const data = new FormData();
		data.append("token", token);
		data.append("episode_id", this.state.episode.id);
		NetworkHandler.request("/list_issues.php", data, responseJson => {
			this.setState({ episodeattachments: responseJson.episodeattachments, issues: responseJson.issues});
		});
	}
	createIssue = description => {
		const data = new FormData();
		data.append("token", this.state.user.token);
		data.append("description", description);
		data.append("episode_id", this.state.episode.id);
		NetworkHandler.request("/create_issue.php", data, responseJson => {
			const issuesCreated = responseJson.issues.length - this.state.issues.length;
			this.setState({ episodeattachments: responseJson.episodeattachments, issues:responseJson.issues});
			this.props.onIssueCreated(this.state.episode, issuesCreated);
		}, e => {
			alert("Error: " + e.message);
		});
	}
	deleteIssue = issue => {
		const data = new FormData();
		data.append("token", this.state.user.token);
		data.append("id", issue.id);
		NetworkHandler.request("/delete_issue.php", data, responseJson => {
			this.setState({ episodeattachments: responseJson.episodeattachments, issues:responseJson.issues});
			this.props.onIssueDeleted(this.state.episode);
		});
	}
	completeIssue = issue => {
		const data = new FormData();
		data.append("token", this.state.user.token);
		data.append("id", issue.id);
		NetworkHandler.request("/complete_issue.php", data, responseJson => {
			this.setState({ episodeattachments: responseJson.episodeattachments, issues:responseJson.issues });
			this.props.onIssueDeleted(this.state.episode, 1);
		});
	}
	uncompleteIssue = issue => {
		if(!confirm("Are you sure you want to unconfirm this issue?")) {
			return;
		}
		const data = new FormData();
		data.append("token", this.state.user.token);
		data.append("id", issue.id);
		NetworkHandler.request("/uncomplete_issue.php", data, responseJson => {
			this.setState({ episodeattachments: responseJson.episodeattachments, issues:responseJson.issues });
			this.props.onIssueCreated(this.state.episode, 1);
		});
	}
	changeIssue = (index, value) => {
		let issues = this.state.issues.slice();
		issues[index] = value;
		this.setState({issues});
	}
	createEpisodeAttachment = file => {
		if(file == null || this.state.uploadingAttachment) {
			return;
		}
		this.setState({ uploadingAttachment: true });
		const data = new FormData();
		data.append("episode_id", this.state.episode.id);
		data.append("token", this.state.user.token);
		data.append("file", file, file.name);
		NetworkHandler.request("/upload_episode_attachment.php", data, responseJson => {
			this.setState({ uploadingAttachment: false, attachmentUploadProgress: 0.0, createdAttachment: null, episodeattachments: responseJson.episodeattachments, issues: responseJson.issues });
		}, e => {
			alert("Upload failed: " + e.message);
			this.setState({ uploadingAttachment: false, attachmentUploadProgress: 0.0, createdAttachment: null });
		}, progress => {
			const attachmentUploadProgress = ((progress.loaded / progress.total) * 100).toFixed(2);
			this.setState({attachmentUploadProgress});
		});
	}
	updateEpisode = () => {
		this.setState({updatingEpisode: true});
		const token = this.state.user.token;
		const data = new FormData();
		data.append("token", token);
		data.append("episode", JSON.stringify(this.state.episode));
		NetworkHandler.request("/update_episode.php", data, responseJson => {
			this.setState({updatingEpisode: false});
			this.props.onUpdatedEpisode(responseJson);
		}, error => {
			this.setState({updatingEpisode: false});
			console.log(error);
			alert("Error");
		});
	}
	render() {
		const {user} = this.props;
		const isLoggedIn = user != null;
		const isQCer = isLoggedIn && user.role >= 1;
		const isEditor = isLoggedIn && user.role >= 2;
		const isAdmin = isLoggedIn && user.role >= 4;
		const {updatingEpisode} = this.state;
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
						Openload: <input type="text" disabled={!isAdmin} value={this.state.episode.openload} onChange={e => this.setState({episode:{...this.state.episode,openload: e.target.value}})} />
						{ isAdmin &&
							<span>Hidden: <input type="checkbox" disabled={!isAdmin} checked={this.state.episode.hidden == 1} onChange={e => this.setState({episode:{...this.state.episode,hidden: e.target.checked ? 1 : 0}})} /></span>
						}
						<br />
						{ isAdmin && <div className={"submit-button" + (updatingEpisode ? " disabled" : "")} onClick={()=>this.updateEpisode()}>Submit</div> }
					</div>
					{ isAdmin &&
						<div className="subform-container">
							<div className="submit-button" onClick={this.props.onDelete}>Delete episode</div>
						</div>
					}
				</Form>
			</div>
		);
	}
}
