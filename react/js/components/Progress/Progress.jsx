import React from "react";
import Layout from "../Layout";
import NetworkHandler from "../../NetworkHandler";
import List from "./List";
import CreateEpisodeForm from "./CreateEpisodeForm";
import LocalStorageUtils from "../../LocalStorageUtils";
import UpdateEpisodeForm from "./UpdateEpisodeForm";
import ViewEpisodeForm from "./ViewEpisodeForm";
import ChangePasswordForm from "./ChangePasswordForm";

export default class Progress extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			"arcs": [],
			"episodes": [],
			"issues":[],
			"showCreateEpisodeFormForArc": null,
			"showUpdateEpisodeForm": null,
			"showViewEpisodeForm": null,
			"showCreateIssueForm": null,
			"showUpdateIssueForm": null,
			"showChangePasswordForm": false,
			"name":"",
			"password":"",
			"user":LocalStorageUtils.getUser()
		};
	}
	componentDidMount() {
		NetworkHandler.post("/list_progress_episodes.php", null, (responseJson) => {
			this.setState({
				arcs: responseJson.arcs, episodes: responseJson.episodes
			});
		});
	}
	onAddCardButtonClick = (arc) => {
		this.showCreateEpisodeForm(arc);
	}
	showCreateEpisodeForm = (arc) => {
		this.setState({showCreateEpisodeFormForArc: arc});
	}
	onCreateEpisode = (episode) => {
		const token = this.state.user.token;
		NetworkHandler.get("/create_episode.php", {
			...episode,
			"token": token,
			"arc_id": this.state.showCreateEpisodeFormForArc.id
		}, (responseJson) => {
			this.setState({showCreateEpisodeFormForArc: null, arcs: responseJson.arcs, episodes: responseJson.episodes});
		}, () => {
		});
	}
	onEditCardButtonClick = (episode) => {
		this.showUpdateEpisodeForm(episode);
	}
	showUpdateEpisodeForm = (episode) => {
		this.setState({showUpdateEpisodeForm: episode});
	}
	onUpdateEpisode = (episode) => {
		const token = this.state.user.token;
		NetworkHandler.get("/update_episode.php", {
			...episode,
			"token": token
		}, (responseJson) => {
			this.setState({showUpdateEpisodeForm: null, arcs: responseJson.arcs, issues: responseJson.issues, episodes: responseJson.episodes});
		}, () => {
		});
	}
	onClickCard = (episode) => {
		this.setState({showViewEpisodeForm: episode});
	}
	onCreateIssue = (description)=>{
		NetworkHandler.get("/create_issue.php",{
			"token": this.state.user.token,
			"description": description
		}, (responseJson)=>{
			this.setState({showCreateIssueForm:null, arcs: responseJson.arcs, issues:responseJson.issues, episodes: responseJson.episodes});
		});
	}
	onUpdateIssue = (issue)=>{
		NetworkHandler.get("/update_issue.php",{
			"token": this.state.user.token,
			...issue
		}, (responseJson)=>{
			this.setState({showUpdateIssueForm:null, arcs: responseJson.arcs, issues:responseJson.issues, episodes: responseJson.episodes});
		});
	}
	onDeleteIssue = (issue) => {
		NetworkHandler.get("/delete_issue.php",{
			"id": issue.id,
			"token": this.state.user.token
		}, (responseJson)=>{
			this.setState({showViewEpisodeForm:null, arcs: responseJson.arcs, issues:responseJson.issues, episodes: responseJson.episodes});
		});
	}
	logOut = () => {
		LocalStorageUtils.setUser(null);
		this.setState({"user": null});
	}
	changePassword = (formdata) => {
		NetworkHandler.get("/update_user_password.php",{
			"oldpassword": formdata.oldpassword,
			"newpassword": formdata.newpassword,
			"token": this.state.user.token
		});
	}
	render() {
		const isLoggedIn = this.state.user != null;
		const isQCer = isLoggedIn && this.state.user.role >= 1;
		const isAdmin = isLoggedIn && this.state.user.role >= 2;
		return (
			<div>
				{!isLoggedIn && this.state.showChangePasswordForm && <ChangePasswordForm onSubmit={formdata=>this.changePassword(formdata)} />}
				{isAdmin && this.state.showCreateEpisodeFormForArc != null && <CreateEpisodeForm arc={this.state.showCreateEpisodeFormForArc} onSubmit={this.onCreateEpisode} />}
				{isAdmin && this.state.showUpdateEpisodeForm != null && <UpdateEpisodeForm episode={this.state.showUpdateEpisodeForm} onSubmit={this.onUpdateEpisode} />}
				{isQCer && this.state.showViewEpisodeForm != null && <ViewEpisodeForm
					user={this.state.user}
					episode={this.state.showViewEpisodeForm}
					issues={this.state.issues.filter(i=>i.episode_id==this.state.showViewEpisodeForm.id)}
					onCreateIssue={description=>isQCer&&this.onCreateIssue(description)}
					onUpdateIssue={issue=>isQCer&&this.onUpdateIssue(issue)}
					onDeleteIssue={issue=>isQCer&&this.onDeleteIssue(issue)}
					onDelete={()=>isAdmin&&this.onDeleteEpisode()} />}
				<Layout layoutContentClassName="flex-scroll-x">
					{!isLoggedIn&&<div className="apply-text">
						Looking to apply as a QCer?
						Contact Galaxy 9000 in our <a href="https://discordapp.com/invite/CKZaYh" rel="noopener noreferrer" target="_blank">Discord</a> to get access!
					</div>}
					{!isLoggedIn &&<div>
						Name: <input type="text" value={this.state.name} onChange={e => this.setState({name: e.target.value})} />
						Password: <input type="password" value={this.state.password} onChange={e => this.setState({password: e.target.value})} />
						<div onClick={()=>{
							NetworkHandler.get("/login.php", {"name": this.state.name, "password": this.state.password}, (user) => {
								LocalStorageUtils.setUser(user);
								this.setState({"user": user});
							}, ()=> alert("Couldnt log in"));
						}}>Log in</div>
					</div>||<div>Logged in as {this.state.user.name}. <div onClick={this.logOut}>Log out</div>
						<div onClick={()=>this.setState({showChangePasswordForm:true})}>Change password</div>
					</div>}
					<div className="card progress-container">
						<div className="list-container">
							{this.state.arcs.map(i =>
								<List
									onAddCardButtonClick={() => isAdmin && this.onAddCardButtonClick(i)}
									onEditCardButtonClick={i => isAdmin && this.onEditCardButtonClick(i)}
									onClickCard={i=>isQCer && this.onClickCard(i)}
									image={"/assets/arc_" + i.id + ".png"}
									title={i.title}
									cards={this.state.episodes.filter(j => j.arc_id == i.id)}
									key={i.id}
								/>)}
						</div>
					</div>
				</Layout>
			</div>
		);
	}
}
