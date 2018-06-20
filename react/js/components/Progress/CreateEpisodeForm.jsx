import React from "react";
import Form from "./Form";

export default class CreateEpisodeForm extends React.Component {
	state = {
		title: "",
		chapters: "",
		episodes: "",
		torrentHash: "",
		crc32: "",
		releasedDate: "",
		resolution: "",
		part: -1,
	}
	render() {
		return (
			<div>
				<Form onSubmit={() => this.props.onSubmit(this.state)}>
					<p>{this.props.arc.title}</p>
					<label>Title: <input type="text" value={this.state.title} onChange={e => this.setState({title: e.target.value})} /></label>
					<label>Part: <input type="number" value={this.state.part} onChange={e => this.setState({part: e.target.value})} /></label>
					<label>Torrent hash: <input type="text" value={this.state.torrentHash} onChange={e => this.setState({torrentHash: e.target.value})} /></label>
					<label>CRC-32: <input type="text" value={this.state.crc32} onChange={e => this.setState({crc32: e.target.value})} /></label>
					<label>Chapters: <input type="text" value={this.state.chapters} onChange={e => this.setState({chapters: e.target.value})} /></label>
					<label>Resolution: <input type="text" value={this.state.resolution} onChange={e => this.setState({resolution: e.target.value})} /></label>
					<label>Released date (YYYY-MM-DD HH:MM): <input type="text" value={this.state.releasedDate} onChange={e => this.setState({releasedDate: e.target.value})} /></label>
					<label>Episodes: <input type="text" value={this.state.episodes} onChange={e => this.setState({episodes: e.target.value})} /></label>
				</Form>
			</div>
		);
	}
}
