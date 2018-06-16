import React from "react";
import Layout from "../Layout";
import NetworkHandler from "../../NetworkHandler";
import List from "./List";

export default class Progress extends React.Component {
	state = {
		"arcs": [],
		"episodes": []
	};
	componentDidMount() {
		NetworkHandler.request("/list_progress_episodes.php", null, (responseJson) => {
			this.setState({
				arcs: responseJson.arcs, episodes: responseJson.episodes
			});
		});
	}
	render() {
		return (
			<div>
				<Layout>
					<div className="progress-main-content">
						<div className="progress-board">
							{this.state.arcs.map((i) => <List title={i.title} cards={this.state.episodes.filter(j => j.arc_id == i.id)} key={i.id} />)}
						</div>
					</div>
				</Layout>
			</div>
		);
	}
}
