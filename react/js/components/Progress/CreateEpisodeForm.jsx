import React from "react";
import Form from "./Form";
import Moment from "moment";

export default class CreateEpisodeForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			chapters: "",
			episodes: "",
			torrent_hash: "",
			crc32: "",
			resolution: "",
			part: -1,
			released_date: Moment().utc().format("YYYY-MM-DD HH:mm:ss")
		};
	}
	render() {
		return (
			<div>
				<Form>
					<p>{this.props.arc.title}</p>
					<label>Title: <input type="text" value={this.state.title} onChange={e => this.setState({title: e.target.value})} /></label>
					<label>Part: <input type="number" value={this.state.part} onChange={e => this.setState({part: e.target.value})} /></label>
					<label>Torrent hash: <input type="text" value={this.state.torrent_hash} onChange={e => this.setState({torrent_hash: e.target.value})} /></label>
					<label>CRC-32: <input type="text" value={this.state.crc32} onChange={e => this.setState({crc32: e.target.value})} /></label>
					<label>Chapters: <input type="text" value={this.state.chapters} onChange={e => this.setState({chapters: e.target.value})} /></label>
					<label>Resolution: <input type="text" value={this.state.resolution} onChange={e => this.setState({resolution: e.target.value})} /></label>
					<label>Released date: <input type="text" value={this.state.released_date} onChange={e => this.setState({released_date: e.target.value})} /></label>
					<label>Episodes: <input type="text" value={this.state.episodes} onChange={e => this.setState({episodes: e.target.value})} /></label>
					<div onClick={this.props.onSubmit}>Submit</div>
				</Form>
			</div>
		);
	}
}
