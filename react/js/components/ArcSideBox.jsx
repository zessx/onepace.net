import React from "react";
import ReactSVG from "react-svg";

export default class ArcSideBox extends React.Component {
	render() {
		const {title, subtitle, children} = this.props;
		return (
			<div className={"arc-side-box" + (this.props.isSelected ? " selected" : "")}>
				<div onClick={this.props.onClick} className="arc-header">
					<img className="arc-img" src={this.props.img} />
					<div className="arc-info">
						<div className="arc-title">{title}</div>
						<div className="arc-subtitle">{subtitle}</div>
					</div>
				</div>
				{this.props.isSelected &&
				<div className="arc-body">
					<div className="arc-links">
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
					{children}
				</div>
				}
			</div>
		);
	}
}
