import React from "react";

export default class ArcSideBox extends React.Component {
	render() {
		const {title, subtitle, children} = this.props;
		return (
			<div className={"arc-side-box" + (this.props.isSelected ? " selected" : "")}>
				<div className="arc-header">
					<div onClick={this.props.onClick} className="arc-header-container">
						<img className="arc-img" src={this.props.img} />
						<div className="arc-info">
							<div className="arc-title">{title}</div>
							<div className="arc-subtitle">{subtitle}</div>
						</div>
					</div>
					<div className="arc-links">
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
				</div>
				{this.props.isSelected &&
				<div className="arc-body">
					{children}
				</div>
				}
			</div>
		);
	}
}
