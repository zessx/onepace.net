import React from "react";
import Layout from "../Layout";
import NetworkHandler from "../../NetworkHandler";
import List from "./List";
import CreateEpisodeForm from "./CreateEpisodeForm";
import LocalStorageUtils from "../../LocalStorageUtils";
import ViewEpisodeForm from "./ViewEpisodeForm";
import ChangePasswordForm from "./ChangePasswordForm";
import CreateUserForm from "./CreateUserForm";

export default class Progress extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			"arcs": [],
			"episodes": [],
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
		NetworkHandler.get("/list_progress_episodes.php", null, (responseJson) => {
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
	onUpdateEpisode = (episode) => {
		const token = this.state.user.token;
		NetworkHandler.get("/update_episode.php", {
			...episode,
			"token": token
		}, (responseJson) => {
			this.setState({showUpdateEpisodeForm: null, arcs: responseJson.arcs, episodes: responseJson.episodes});
		}, () => {
		});
	}
	onDeleteEpisode = () => {
		const token = this.state.user.token;
		NetworkHandler.get("/delete_episode.php", {
			"id": this.state.showViewEpisodeForm.id,
			"token": token
		}, (responseJson) => {
			this.setState({showViewEpisodeForm: null, arcs: responseJson.arcs, episodes: responseJson.episodes});
		}, () => {
		});
	}
	onClickCard = (episode) => {
		this.setState({showViewEpisodeForm: episode});
	}
	logIn = () => {
		NetworkHandler.get("/login.php", {
			"name": this.state.name,
			"password": this.state.password
		}, user => {
			LocalStorageUtils.setUser(user);
			this.setState({"user": user});
		}, () => {
			alert("Couldnt log in");
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
		},() => {
			this.setState({showChangePasswordForm: false});
		});
	}
	createUser = (formdata) => {
		NetworkHandler.get("/create_user.php",{
			"name": formdata.name,
			"password": formdata.password,
			"token": this.state.user.token,
			"role": formdata.role
		}, () => {
			this.setState({showCreateUserForm: false});
		});
	}
	render() {
		const isLoggedIn = this.state.user != null;
		const isAdmin = isLoggedIn && this.state.user.role >= 4;
		return (
			<div>
				{
					isLoggedIn && this.state.showChangePasswordForm &&
					<ChangePasswordForm
						onSubmit={formdata=>this.changePassword(formdata)}
						onClose={()=>this.setState({showChangePasswordForm:false})}
					/>
				}
				{
					isAdmin && this.state.showCreateUserForm &&
					<CreateUserForm
						onSubmit={this.createUser}
						onClose={()=>this.setState({showCreateUserForm:false})}
					/>
				}
				{
					isAdmin && this.state.showCreateEpisodeFormForArc != null &&
					<CreateEpisodeForm
						arc={this.state.showCreateEpisodeFormForArc}
						onSubmit={this.onCreateEpisode}
						onClose={()=>this.setState({showCreateEpisodeFormForArc:null})}
					/>
				}
				{
					this.state.showViewEpisodeForm != null &&
					<ViewEpisodeForm
						user={this.state.user}
						episode={this.state.showViewEpisodeForm}
						onDelete={()=>isAdmin&&this.onDeleteEpisode()}
						onClose={()=>this.setState({showViewEpisodeForm:null})}
						onUpdateEpisode={formdata=>this.onUpdateEpisode(formdata)}
					/>
				}
				<Layout layoutContentClassName="flex-scroll-x">
					<div className="card progress-container">
						{
							isLoggedIn &&
							<div className="login-side-container">
								Logged in as {this.state.user.name}.
								<div className="submit-button" onClick={this.logOut}>Log out</div>
								<div className="submit-button" onClick={()=>this.setState({showChangePasswordForm:true})}>Change password</div>
								{ isAdmin && <div className="submit-button" onClick={()=>this.setState({showCreateUserForm:true})}>Create user</div> }
							</div>
							||
							<div className="login-side-container">
								Looking to apply as a QCer?
								Contact Galaxy 9000 in our <a href="https://discordapp.com/invite/uzmumFv" rel="noopener noreferrer" target="_blank">Discord</a> to get access!
								<div className="login-container">
									Name:
									<br />
									<input type="text" value={this.state.name} onChange={e => this.setState({name: e.target.value})} />
									Password:
									<br />
									<input type="password" value={this.state.password} onChange={e => this.setState({password: e.target.value})} />
									<div className={"submit-button" + ((this.state.password.length==0||this.state.name.length==0) ? " disabled" : "")} onClick={this.logIn}>Log in</div>
								</div>
							</div>
						}
						<div className="list-container">
							{
								this.state.arcs.map(i =>
									<List
										user={this.state.user}
										onAddCardButtonClick={() => isAdmin && this.onAddCardButtonClick(i)}
										onClickCard={i=>this.onClickCard(i)}
										image={"/assets/arc_" + i.id + ".png"}
										title={i.title}
										cards={this.state.episodes.filter(j => j.arc_id == i.id)}
										key={i.id}
									/>
								)
							}
						</div>
					</div>
				</Layout>
			</div>
		);
	}
}
