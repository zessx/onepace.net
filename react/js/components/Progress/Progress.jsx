import React from "react";
import Layout from "../Layout";
import NetworkHandler from "../../NetworkHandler";
import List from "./List";
import FloatingForm from "./FloatingForm";

export default class Progress extends React.Component {
	state = {
		"arcs": [],
		"episodes": [],
		"showFloatingForm": false
	};
	componentDidMount() {
		NetworkHandler.request("/list_progress_episodes.php", null, (responseJson) => {
			this.setState({
				arcs: responseJson.arcs, episodes: responseJson.episodes
			});
		});
	}
	onAddCardButtonClick = () => {
		this.showFloatingForm();
	}
	showFloatingForm = () => {
		this.setState({showFloatingForm: true});
	}
	render() {
		return (
			<div>
				{this.state.showFloatingForm && <FloatingForm />}
				<Layout layoutContentClassName="flex-scroll-x">
					<div className="card progress-container">
						<div className="list-container">
							{this.state.arcs.map((i) => <List onAddCardButtonClick={this.onAddCardButtonClick} image={"/assets/arc_" + i.id + ".png"} title={i.title} cards={this.state.episodes.filter(j => j.arc_id == i.id)} key={i.id} />)}
						</div>
					</div>
				</Layout>
			</div>
		);
	}
}
