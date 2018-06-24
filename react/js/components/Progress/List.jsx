import React from "react";
import Card from "./Card";
import { Glyphicon } from "react-bootstrap";

export default class List extends React.Component {
	render() {
		const isLoggedIn = this.props.user != null;
		const isAdmin = isLoggedIn && this.props.user.role >= 2;
		return (
			<div className="list">
				<div className="list-content">
					<div className="header">{this.props.title}</div>
					<div className="cards">
						<Card img={this.props.image} />
						{this.props.cards.map(i => {
							let title = i.chapters == null || i.chapters.length == 0 ? "" : "[" + i.chapters + "] ";
							title += i.part == null ? i.title : this.props.title + " " + i.part.toString().padStart(2, "0");
							return <Card
								user={this.props.user}
								onView={()=>this.props.onClickCard(i)}
								key={i.id}
								title={title}
								status={i.status}
								onEditCardButtonClick={()=>this.props.onEditCardButtonClick(i)}
							/>;
						})}
					</div>
					{
						isAdmin &&
						<div className="add-card-button-container">
							<div className="add-card-button" onClick={() => this.props.onAddCardButtonClick()}>
								<Glyphicon glyph="plus" />
								<div className="the-text">Add episode</div>
							</div>
						</div>
					}
				</div>
			</div>
		);
	}
}
