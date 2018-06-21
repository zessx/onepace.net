import React from "react";
import Layout from "../Layout";
import NetworkHandler from "../../NetworkHandler";
import List from "./List";
import CreateEpisodeForm from "./CreateEpisodeForm";
import LocalStorageUtils from "../../LocalStorageUtils";
import UpdateEpisodeForm from "./UpdateEpisodeForm";

export default class Progress extends React.Component {
	state = {
		"arcs": [],
		"episodes": [],
		"showCreateEpisodeFormForArc": null,
		"showUpdateEpisodeForm": null
	};
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
		const token = LocalStorageUtils.getToken();
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
		const token = LocalStorageUtils.getToken();
		NetworkHandler.get("/update_episode.php", {
			...episode,
			"token": token
		}, (responseJson) => {
			this.setState({showUpdateEpisodeForm: null, arcs: responseJson.arcs, episodes: responseJson.episodes});
		}, () => {
		});
	}
	render() {
		return (
			<div>
				{this.state.showCreateEpisodeFormForArc != null && <CreateEpisodeForm arc={this.state.showCreateEpisodeFormForArc} onSubmit={this.onCreateEpisode} />}
				{this.state.showUpdateEpisodeForm != null && <UpdateEpisodeForm episode={this.state.showUpdateEpisodeForm} onSubmit={this.onUpdateEpisode} />}
				<Layout layoutContentClassName="flex-scroll-x">
					<div className="card progress-container">
						<div className="list-container">
							{this.state.arcs.map((i) =>
								<List
									onAddCardButtonClick={() => this.onAddCardButtonClick(i)}
									onEditCardButtonClick={(i) => this.onEditCardButtonClick(i)}
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
