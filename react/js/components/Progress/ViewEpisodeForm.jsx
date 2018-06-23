import React from "react";
import Form from "./Form";

export default class ViewEpisodeForm extends React.Component {
	constructor(props) {
		super(props);
		const episode = this.props.episode;
		this.state = {
			id: episode.id,
			title: episode.title,
			chapters: episode.chapters,
			episodes: episode.episodes,
			torrent_hash: episode.torrent_hash,
			crc32: episode.crc32,
			resolution: episode.resolution,
			part: episode.part,
			released_date: episode.released_date,
			issue_description:"",
			issues:this.props.issues
		};
	}
	render() {
		const isLoggedIn = this.props.user != null;
		const isQCer = isLoggedIn && this.props.user.role >= 1;
		const isAdmin = isLoggedIn && this.props.user.role >= 2;
		return (
			<div>
				<Form>
					{isAdmin &&<div onClick={()=>this.props.onDelete()}>Delete episode</div>}
					Description: <input type="text" value={this.state.issue_description} onChange={e => this.setState({issue_description: e.target.value})} />
					<div onClick={()=>this.props.onCreateIssue(this.state.issue_description)}>Create issue</div>
					<div className="issues">
						{this.state.issues.map(i => 
							<div key={i.id} className="issue">
								<div className="description">{i.description}</div>
								{isQCer&&<div onClick={()=>this.props.onDeleteIssue(i)}>Delete</div>}
							</div>
						)}
					</div>
				</Form>
			</div>
		);
	}
}
