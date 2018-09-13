import React from "react";

export default class About extends React.Component {
	componentDidMount() {
		document.title = "One Pace | About";
	}
	render() {
		return (
			<div className="about with-padding">
				<h2>What is One Pace?</h2>
				<p>
					One Pace is a project aiming to match the One Piece manga more accurately than Toei's anime adaptation.
					We cut out filler scenes, reaction shots, padded sequences, and re-order scenes to stay truer to Goda's manga.
				</p>
				<p>
					If this is your first visit, check out our <a href="/#/Progress">Progress page</a> to see what we've
					completed so far. (Blue means it's in progress, White is done.)
				</p>
			</div>
		);
	}
}
