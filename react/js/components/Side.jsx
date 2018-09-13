import React, { Component } from "react";
import ReactDOM from "react-dom";
import LocalStorageUtils from "../LocalStorageUtils";
import NetworkHandler from "../NetworkHandler";
import ArcSideBox from "./ArcSideBox";
import EpisodeSideBox from "./EpisodeSideBox";

export default class Side extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isMinimized: LocalStorageUtils.getSidebarToggled(),
			selectedArc: null,
			selectedEpisode: null,
			episodes: [],
			arcs: []
		};
	}
	componentDidMount() {
		NetworkHandler.request("/get_streams.php", null, (response) => {
			const {arcs, episodes} = response;
			const selectedArcId = LocalStorageUtils.getWatchSelectedArcId();
			const selectedEpisodeId = LocalStorageUtils.getWatchSelectedEpisodeId();
			let selectedArc = null;
			let selectedEpisode = null;
			if (selectedEpisodeId) {
				[selectedEpisode] = episodes.filter((i) => i.id == selectedEpisodeId);
			}
			if(selectedArcId) {
				[selectedArc] = arcs.filter((i) => i.id == selectedArcId);
			} else if(selectedEpisode) {
				[selectedArc] = arcs.filter((i) => i.id == selectedEpisode.arcId);
				LocalStorageUtils.setWatchSelectedArcId(selectedArc ? selectedArc.id : null);
			}
			this.setState({ selectedArc, selectedEpisode, arcs, episodes }, () => {
				this.props.onSetState(this.state.selectedArc, this.state.selectedEpisode);
				this.scrollToArc();
			});
		});
	}
	scrollToArc = () => {
		if(this.state.selectedArc != null && this.SelectedArcRef != null) {
			const domNode = ReactDOM.findDOMNode(this.SelectedArcRef);
			domNode.scrollIntoView();
		}
	}
	changeArc = (selectedArc) => {
		if(this.state.selectedArc && selectedArc.id == this.state.selectedArc.id) {
			selectedArc = null;
		}
		LocalStorageUtils.setWatchSelectedArcId(selectedArc ? selectedArc.id : null);
		LocalStorageUtils.setWatchSelectedEpisodeId(null);
		this.setState({ selectedArc: selectedArc, selectedEpisode: null }, () => {
			this.props.onChangeArc(this.state.selectedArc);
			this.scrollToArc();
		});
	}
	changeEpisode = (selectedEpisode, cb) => {
		if(this.state.selectedEpisode && selectedEpisode.id == this.state.selectedEpisode.id) {
			selectedEpisode = null;
		}
		LocalStorageUtils.setWatchSelectedEpisodeId(selectedEpisode ? selectedEpisode.id : null);
		this.setState({ selectedEpisode }, cb);
	}
	toggleMinimize = e => {
		e.preventDefault();
		LocalStorageUtils.setSidebarToggled(!this.state.isMinimized);
		this.setState({ isMinimized: !this.state.isMinimized });
	}
	getEpisodeSideBox = episode => {
		const isSelected = this.state.selectedEpisode != null && episode.id == this.state.selectedEpisode.id;
		const title = episode.part ? "Episode " + episode.part.toString().padStart(2, '0') : episode.title;
		let subtitle = episode.chapters ? "Chapters: " + episode.chapters : "";
		subtitle += episode.episodes ? "\n" + "Episodes: " + episode.episodes : "";
		return <EpisodeSideBox
			onClick={() => this.changeEpisode(episode, () => {
				this.props.onChangeEpisode(this.state.selectedEpisode, true);
			})}
			onStopVideo={()=>this.props.onStopVideo()}
			key={episode.id}
			title={title}
			subtitle={subtitle}
			magnet={episode.torrent ? episode.torrent.magnet : null}
			torrentLink={episode.torrent ? "/torrents/" + episode.torrent.torrent_name : null}
			isSelected={isSelected}
			isReleased={episode.isReleased}
		/>
	}
	getArcEpisodes = arc => this.state.episodes.filter(episode => episode.arcId == arc.id);
	getArcSideBox = arc => {
		var isSelected = this.state.selectedArc != null && arc.id == this.state.selectedArc.id;
		var subtitle = (arc.chapters ? "Chapter " : "") + arc.chapters + (arc.episodes ? "\n" + "Episode " + arc.episodes : "");
		var arcEpisodes = isSelected ? this.getArcEpisodes(arc) : [];
		var img = "/assets/arc_" + arc.id + ".png";
		return <ArcSideBox
			onStopVideo={()=>this.props.onStopVideo()}
			onClick={() => this.changeArc(arc)}
			key={arc.id} img={img} title={arc.title} subtitle={subtitle}
			magnet={arc.torrent ? arc.torrent.magnet : null}
			torrentLink={arc.torrent ? "/torrents/" + arc.torrent.torrent_name : null}
			isSelected={isSelected}
			ref={isSelected ? (section) => { this.SelectedArcRef = section } : null}
		>
			<div className="episodes">
				{arcEpisodes.map(episode => this.getEpisodeSideBox(episode))}
			</div>
		</ArcSideBox>
	}
	render() {
		return <div className={"side" + (this.state.isMinimized ? " minimized" : "")}>
			<div className="toggler" onClick={this.toggleMinimize}></div>
			<div className="arcs">
				{this.state.arcs.map(arc => this.getArcSideBox(arc))}
			</div>
		</div>
	}
}
