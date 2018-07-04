import React from "react";
import Form from "./Form";

export default class ViewArcForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.user,
			arc: this.props.arc
		};
	}
	render() {
		const {user} = this.props;
		const isLoggedIn = user != null;
		const isAdmin = isLoggedIn && user.role >= 4;
		return (
			<div>
				<Form onClose={this.props.onClose}>
					<div className="subform-container">
						ID: <input type="text" disabled value={this.state.arc.id} />
						Title: <input type="text" disabled={!isAdmin} value={this.state.arc.title} onChange={e => this.setState({arc:{...this.state.arc,title: e.target.value}})} />
						Chapters: <input type="text" disabled={!isAdmin} value={this.state.arc.chapters} onChange={e => this.setState({arc:{...this.state.arc,chapters: e.target.value}})} />
						Resolution: <input type="text" disabled={!isAdmin} value={this.state.arc.resolution} onChange={e => this.setState({arc:{...this.state.arc,resolution: e.target.value}})} />
						Episodes: <input type="text" disabled={!isAdmin} value={this.state.arc.episodes} onChange={e => this.setState({arc:{...this.state.arc,episodes: e.target.value}})} />
						{
							isAdmin &&
							<span>Hidden: <input type="checkbox" disabled={!isAdmin} checked={this.state.arc.hidden == 1} onChange={e => this.setState({arc:{...this.state.arc,hidden: e.target.checked ? 1 : 0}})} /></span>
						}
						<br />
						{
							isAdmin &&
							<div className="submit-button" onClick={()=>this.props.onUpdateArc(this.state.arc)}>Submit</div>
						}
					</div>
				</Form>
			</div>
		);
	}
}
