import React from "react";
import NetworkHandler from "../NetworkHandler";
import { browserHistory } from "react-router";
import { LocalStorageKeys } from "../LocalStorageUtils";

export default class Watch extends React.Component {
	state = {
		"arcs": [],
		"episodes": [],
		"selectedArc": null,
		"selectedEpisode": null
	};
	componentDidMount() {
		NetworkHandler.request("/get_streams.php", {}, (response) => {
			const {
				arcs,
				episodes,
			} = response;
			let selectedEpisodeId = this.props.location.query.episode;
			let selectedArc = null;
			let selectedEpisode = null;
			if (selectedEpisodeId == null || selectedEpisodeId <= 0) {
				selectedEpisodeId = localStorage.getItem(LocalStorageKeys.WatchSelectedEpisodeId);
			}
			if (selectedEpisodeId != null && selectedEpisodeId > 0) {
				[selectedEpisode] = episodes.filter((i) => i.id == selectedEpisodeId);
				if(selectedEpisode != null) {
					[selectedArc] = arcs.filter((i) => i.id == selectedEpisode.arcId);
				}
			}
			if (arcs.length > 0 && selectedEpisode == null) {
				[selectedArc] = arcs;
				[selectedEpisode] = episodes.filter((i) => i.arcId == selectedArc.id);
			}
			if (selectedEpisode != null) {
				browserHistory.push("/#/?episode=" + selectedEpisode.id);
			}
			this.setState({
				"selectedArc": selectedArc,
				"selectedEpisode": selectedEpisode,
				"arcs": arcs,
				"episodes": episodes,
			});
		});
	}
	changeArc = (arcId) => {
		let selectedArc = null;
		let selectedEpisode = null;
		if (this.state.arcs.length > 0) {
			[selectedArc] = this.state.arcs.filter((i) => i.id === arcId);
			[selectedEpisode] = this.state.episodes.filter((i) => i.arcId == arcId);
			localStorage.setItem(LocalStorageKeys.WatchSelectedEpisodeId, selectedEpisode.id);
			browserHistory.push("/#/?episode=" + selectedEpisode.id);
		}
		this.setState({
			"selectedArc": selectedArc,
			"selectedEpisode": selectedEpisode,
		});
		this.videoRef.load();
	}
	changeEpisode = (episodeId) => {
		const [selectedEpisode] = this.state.episodes.filter((i) => i.id === episodeId);
		const [selectedArc] = this.state.arcs.filter((i) => i.id === selectedEpisode.arcId);
		localStorage.setItem(LocalStorageKeys.WatchSelectedEpisodeId, selectedEpisode.id);
		this.setState({
			"selectedEpisode": selectedEpisode,
			"selectedArc": selectedArc,
		});
		browserHistory.push("/#/?episode=" + episodeId);
		this.videoRef.load();
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
		const { selectedArc, selectedEpisode, arcs } = this.state;
		const episodes = selectedEpisode != null && selectedEpisode.episodes != null && selectedEpisode.episodes.length > 0 ? selectedEpisode.episodes : selectedArc != null && selectedArc.episodes != null && selectedArc.episodes.length > 0 ? selectedArc.episodes : "";
		return (
			<div className="card">
				<div className="watch-top"><center>
					<select
						className="arcs"
						value={selectedArc == null ? 0 : selectedArc.id}
						onChange={(e) => this.changeArc(e.target.value)}
					>
						{
							(arcs.length == 0 && <option>Loading...</option>) ||
							arcs.map((arc, i) => {
								let title = "[One Pace]";
								title += arc.chapters != null && arc.chapters.length > 0 ? "[" + arc.chapters + "]" : "";
								title += arc.title != null && arc.title.length > 0 ? " " + arc.title : " Untitled";
								title += arc.resolution != null && arc.resolution.length > 0 ? " [" + arc.resolution + "]" : "";
								title += arc.released ? "" : " (Unreleased)";
								return <option disabled={!arc.released} key={"arc" + i} value={arc.id}>{title}</option>;
							})
						}
					</select>
					<select
						className="episodes"
						value={selectedEpisode == null ? 0 : selectedEpisode.id}
						onChange={(e) => this.changeEpisode(e.target.value)}>
						{
							(this.state.episodes.length == 0 && <option>Loading...</option>) ||
							this.state.episodes.filter((i) => i.arcId == selectedArc.id).map((episode, i) => {
								let title = "[One Pace]";
								title += episode.chapters != null && episode.chapters.length > 0 ? "[" + episode.chapters + "]" : "";
								title += episode.part != null ? " " + selectedArc.title + " " + ("00" + episode.part.toString()).slice(-2) : episode.title.length > 0 ? " " + episode.title : "";
								title += " [" + episode.resolution + "]";
								title += episode.crc32 != null && episode.crc32.length > 0 ? "[" + episode.crc32 + "]" : "";
								const status = episode.status.length > 0 ? " (" + episode.status + ")" : !episode.isReleased ? " (Unreleased)" : "";
								title += status;
								return <option disabled={!episode.isReleased} key={"episode" + i} value={episode.id}>{title}</option>;
							})
						}
					</select>
					<span className="prev-ep" onClick={() => this.nav("prev")}>&nbsp; &laquo; &nbsp;</span>
					<span className="next-ep" onClick={() => this.nav("next")}>&nbsp; &raquo; &nbsp;</span>
					{episodes.length > 0 && <span>Episodes: {episodes}</span>}
				</center>
				</div>
				<video ref={(i) => this.videoRef = i} className="video-player" controls poster="assets/logo-poster-dark.png">
					{
						selectedEpisode != null && <source type="video/mp4" src={"http://onepace.net/streams/" + selectedEpisode.crc32 + ".mp4"} />
					}
				</video>
			</div>
		);
	}
}
