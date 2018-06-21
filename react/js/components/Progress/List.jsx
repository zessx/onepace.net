import React from "react";
import Card from "./Card";
import { Glyphicon } from "react-bootstrap";

export default class List extends React.Component {
	render() {
		return (
			<div className="list">
				<div className="list-content">
					<div className="header">{this.props.title}</div>
					<div className="cards">
						<Card img={this.props.image} />
						{this.props.cards.map(i => {
							let title = "";
							title += i.chapters == null || i.chapters.length == 0 ? "" : "[" + i.chapters + "] ";
							title += i.part == null ? i.title : this.props.title + " " + i.part.toString().padStart(2, "0");
							return <Card key={i.id} title={title} onEditCardButtonClick={()=>this.props.onEditCardButtonClick(i)} />;
						})}
					</div>
					<div className="add-card-button-container">
						<div className="add-card-button" onClick={() => this.props.onAddCardButtonClick()}>
							<Glyphicon glyph="plus" />
							<div className="the-text">Add another card</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
