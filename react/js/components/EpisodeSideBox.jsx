import React from "react";
import ReactSVG from "react-svg";

export default class EpisodeSideBox extends React.Component {
	render() {
		return (
			<div className={"episode-side-box" + (this.props.isSelected ? " selected" : "")}>
				<div className="episode-info" onClick={this.props.onClick}>
					<div className="episode-title">{this.props.title}</div>
					<div className="episode-subtitle">{this.props.subtitle}</div>
				</div>
				{this.props.isSelected && (this.props.magnet || this.props.torrentLink) &&
				<div className="episode-links">
					{this.props.magnet &&
					<a href={this.props.magnet} onClick={()=>this.props.onStopVideo()}>
						<ReactSVG className="svg-button magnet" src="assets/baseline-offline_bolt-24px.svg" />
					</a>
					}
					{this.props.torrentLink &&
					<a href={this.props.torrentLink} onClick={()=>this.props.onStopVideo()}>
						<ReactSVG className="svg-button torrent" src="assets/baseline-device_hub-24px.svg" />
					</a>
					}
				</div>
				}
			</div>
		);
	}
}
