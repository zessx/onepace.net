import React from "react";
import Layout from "../Layout";
import NetworkHandler from "../../NetworkHandler";
import List from "./List";
import CreateEpisodeForm from "./CreateEpisodeForm";
import LocalStorageUtils from "../../LocalStorageUtils";

export default class Progress extends React.Component {
	state = {
		"arcs": [],
		"episodes": [],
		"showCreateEpisodeFormForArc": null
	};
	componentDidMount() {
		NetworkHandler.request("/list_progress_episodes.php", null, (responseJson) => {
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
		NetworkHandler.request("/create_episode.php", {
			"token": token,
			"arc_id": this.state.showCreateEpisodeFormForArc,
			"torrent_hash": episode.torrentHash,
			"released_date": episode.releasedDate,
			"crc32": episode.crc32,
			"title": episode.title,
			"chapters": episode.chapters,
			"episodes": episode.episodes,
			"resolution": episode.resolution,
		}, () => {
			this.setState({showCreateEpisodeFormForArc: null});
		}, () => {
		});
	}
	render() {
		return (
			<div>
				{this.state.showCreateEpisodeFormForArc != null && <CreateEpisodeForm arc={this.state.showCreateEpisodeFormForArc} onSubmit={this.onCreateEpisode} />}
				<Layout layoutContentClassName="flex-scroll-x">
					<div className="card progress-container">
						<div className="list-container">
							{this.state.arcs.map((i) => <List onAddCardButtonClick={() => this.onAddCardButtonClick(i)} image={"/assets/arc_" + i.id + ".png"} title={i.title} cards={this.state.episodes.filter(j => j.arc_id == i.id)} key={i.id} />)}
						</div>
					</div>
				</Layout>
			</div>
		);
	}
}
