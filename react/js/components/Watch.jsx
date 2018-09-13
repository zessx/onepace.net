import React from "react";
import { browserHistory } from "react-router";
import LocalStorageUtils from "../LocalStorageUtils";
import Side from "./Side";

export default class Watch extends React.Component {
	state = {
		selectedArc: null,
		selectedEpisode: null
	}
	nav = (dir) => {
		const episodes = this.state.episodes.filter((i) => i.isReleased);
		for (let i = 0; i < episodes.length; i++) {
			const episode = episodes[i];
			if (episode.id === this.state.selectedEpisode.id) {
				if (!((dir == "prev" && i == 0) || (dir == "next" && i >= episodes.length - 1))) {
					const otherEpisode = episodes[dir == "prev" ? i - 1 : i + 1];
					this.changeEpisode(otherEpisode.id);
				}
				break;
			}
		}
	}
	render() {
		return (
			<div className="watch">
				<Side
					params={this.props.params}
					onSetState={(selectedArc, selectedEpisode) => {
						this.setState({ selectedArc, selectedEpisode });
						this.videoRef.load();
					}}
					onChangeArc={selectedArc => {
						this.setState({ selectedArc: selectedArc, selectedEpisode: null });
						this.videoRef.load();
					}}
					onChangeEpisode={(selectedEpisode, autoPlay) => {
						this.setState({ selectedEpisode });
						this.videoRef.load();
						if(autoPlay) {
							this.videoRef.play();
						}
					}}
					onStopVideo={()=>this.videoRef.pause()}
				/>
				<video ref={(i) => this.videoRef = i} className="video-player" controls poster="assets/logo-poster.png">
				{ this.state.selectedEpisode != null &&
					<source type="video/mp4" src={"http://onepace.net/streams/" + this.state.selectedEpisode.crc32 + ".mp4"} />
				}
				</video>
			</div>
		);
	}
}
