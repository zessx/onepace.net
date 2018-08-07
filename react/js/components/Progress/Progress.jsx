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
		let token = null;
		if(this.state.user) {
			token = this.state.user.token;
		}
		const data = new FormData();
		data.append("token", token);
		NetworkHandler.request("/list_progress_episodes.php", data, (responseJson) => {
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
		const data = new FormData();
		episode.arc_id = this.state.showCreateEpisodeFormForArc.id;
		data.append("episode", JSON.stringify(episode));
		data.append("token", token);
		NetworkHandler.request("/create_episode.php", data, (responseJson) => {
			this.setState({showCreateEpisodeFormForArc: null, arcs: responseJson.arcs, episodes: responseJson.episodes});
		}, () => {
		});
	}
	onUpdateEpisode = (episode) => {
		const token = this.state.user.token;
		const data = new FormData();
		data.append("token", token);
		data.append("episode", JSON.stringify(episode));
		NetworkHandler.request("/update_episode.php", data, (responseJson) => {
			this.setState({showUpdateEpisodeForm: null, arcs: responseJson.arcs, episodes: responseJson.episodes});
		}, () => {
		});
	}
	onDeleteEpisode = () => {
		const token = this.state.user.token;
		const data = new FormData();
		data.append("id", this.state.showViewEpisodeForm.id);
		data.append("token", token);
		NetworkHandler.request("/delete_episode.php", data, (responseJson) => {
			this.setState({showViewEpisodeForm: null, arcs: responseJson.arcs, episodes: responseJson.episodes});
		}, () => {
		});
	}
	onClickCard = (episode) => {
		this.setState({showViewEpisodeForm: episode});
	}
	logIn = () => {
		const data = new FormData();
		data.append("name", this.state.name);
		data.append("password", this.state.password);
		NetworkHandler.request("/login.php", data, responseJson => {
			const user = responseJson.user;
			LocalStorageUtils.setUser(user);
			this.setState({name: "", password: "", "user": user, arcs: responseJson.arcs, episodes: responseJson.episodes});
		}, () => {
			alert("Couldnt log in");
		});
	}
	logOut = () => {
		LocalStorageUtils.setUser(null);
		const data = new FormData();
		data.append("token", this.state.user.token);
		NetworkHandler.request("/logout.php", data, responseJson => {
			this.setState({ user: null, arcs: responseJson.arcs, episodes: responseJson.episodes });
		}, () => this.setState({ user: null })
		);
	}
	changePassword = (formdata) => {
		const data = new FormData();
		data.append("oldpassword", formdata.oldpassword);
		data.append("newpassword", formdata.newpassword);
		data.append("token", formdata.token);
		NetworkHandler.request("/update_user_password.php", data, () => {
			this.setState({showChangePasswordForm: false});
		});
	}
	createUser = (formdata) => {
		const data = new FormData();
		data.append("name", formdata.name);
		data.append("password", formdata.password);
		data.append("token", this.state.user.token);
		data.append("role", formdata.role);
		NetworkHandler.request("/create_user.php", data, () => {
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
						onIssueDeleted={episode => {
							let episodes = this.state.episodes.slice();
							const index = episodes.findIndex(i => i.id == episode.id);
							if(index == -1) return;
							episodes[index].issues_total = Math.max(0, episodes[index].issues_total - 1);
							this.setState({episodes});
						}}
						onIssueCreated={(episode, issuesCreated) => {
							let episodes = this.state.episodes.slice();
							const index = episodes.findIndex(i => i.id == episode.id);
							if(index == -1) return;
							episodes[index].issues_total += issuesCreated;
							this.setState({episodes});
						}}
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
										arc={i}
										user={this.state.user}
										onAddCardButtonClick={() => isAdmin && this.onAddCardButtonClick(i)}
										onClickCard={i=>this.onClickCard(i)}
										image={"/assets/arc_" + i.id + ".png"}
										cards={this.state.episodes.filter(j => j.arc_id == i.id)}
										key={"arc"+i.id}
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
