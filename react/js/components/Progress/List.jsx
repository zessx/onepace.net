import React from "react";
import Card from "./Card";
import { Glyphicon } from "react-bootstrap";
import Moment from "moment";

export default class List extends React.Component {
	render() {
		const isLoggedIn = this.props.user != null;
		const isAdmin = isLoggedIn && this.props.user.role >= 4;
		return (
			<div className="list">
				<div className="list-content">
					<div className={"header" + (this.props.arc.admin_only ? " admin-only" : "")}>{this.props.title}</div>
					<div className="cards">
						<Card img={this.props.image} />
						{this.props.cards.map(i => {
							const title = i.part == null ? i.title : this.props.title + " " + i.part.toString().padStart(2, "0");
							const status1 = i.title != null ? i.title : "";
							const status2 = i.chapters != null ? i.chapters : "";
							const status3 = i.released_date.length > 0 ? Moment(i.released_date, "YYYY-MM-DD HH:mm:ss").format("MMMM D, YYYY") : "";
							return <Card
								user={this.props.user}
								onView={()=>this.props.onClickCard(i)}
								key={i.id}
								admin_only={i.admin_only}
								title={title}
								status1={status1}
								status2={status2}
								status3={status3}
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
