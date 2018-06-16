import React from "react";
import Card from "./Card";

export default class List extends React.Component {
	render() {
		return (
			<div className="progress-list-wrapper">
				<div className="progress-list-content">
					{this.props.title}
					<div className="progress-cards-wrapper">
						{this.props.cards.map(i => <Card key={i.id} title={i.part} />)}
					</div>
				</div>
			</div>
		);
	}
}
