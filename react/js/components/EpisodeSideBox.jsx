import React from "react";

export default class EpisodeSideBox extends React.Component {
	render() {
		return (
			<div className={"episode-side-box" + (this.props.isSelected ? " selected" : "") + (this.props.isReleased ? " released" : "")}>
				<div className="episode-info" onClick={this.props.isReleased ? this.props.onClick : null}>
					<div className="episode-title">{this.props.title}</div>
					<div className="episode-subtitle">{this.props.subtitle}</div>
				</div>
				{(this.props.magnet || this.props.torrentLink) &&
				<div className="episode-links">
					{this.props.magnet &&
					<a className="torrent-link" href={this.props.magnet} onClick={()=>this.props.onStopVideo()}>
						<i className="fas fa-magnet" />
					</a>
					}
					{this.props.torrentLink &&
					<a className="torrent-link" href={this.props.torrentLink} onClick={()=>this.props.onStopVideo()}>
						<i className="fas fa-file-download" />
					</a>
					}
				</div>
				}
			</div>
		);
	}
}
