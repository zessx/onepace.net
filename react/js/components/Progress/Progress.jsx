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
				<Layout layoutContentClassName="flex-scroll-x">
					<div className="card progress-container">
						<div className="list-container">
							{this.state.arcs.map((i) => <List image={"/assets/arc_" + i.id + ".png"} title={i.title} cards={this.state.episodes.filter(j => j.arc_id == i.id)} key={i.id} />)}
						</div>
					</div>
				</Layout>
			</div>
		);
	}
}
