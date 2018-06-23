import React from "react";
import Layout from "./Layout";

export default class About extends React.Component {
	componentDidMount() {
		document.title = "One Pace | About";
	}
	render() {
		return (
			<div>
				<Layout>
					<div className="card">
						<div className="about">
							<h2>What is One Pace?</h2>
							<ul className="vl">
								<li>One Pace is a One Piece project that condenses the anime into more accurate adaptations of the manga. It involves removing filler scenes, shortening slow or padded scenes, and merging episodes together.</li>
							</ul>
							<hr />
						</div>
						<div className="members">
							<h2>One Pace Team</h2>
							<table className="vl">
								<tbody>
									<tr>
										<td width="10%">Sewil</td>
										<td>Editor / Web/server / Project manager</td>
									</tr>
									<tr>
										<td>Galaxy 9000</td>
										<td>Editor / Co-project/community manager</td>
									</tr>
									<tr>
										<td>Feeso</td>
										<td>Editor</td>
									</tr>
									<tr>
										<td>Halee</td>
										<td>Soundtracker / Timer</td>
									</tr>
									<tr>
										<td>Datenshi</td>
										<td>Timer / Graphical designer</td>
									</tr>
									<tr>
										<td>Grug</td>
										<td>QCer</td>
									</tr>
									<tr>
										<td>Pepperjack</td>
										<td>QCer</td>
									</tr>
									<tr>
										<td>Kaitou Yahiko</td>
										<td>Aegisub Karaoke/Attacks designer / Graphical designer</td>
									</tr>
									<tr>
										<td>Rael</td>
										<td>Editor</td>
									</tr>
									<tr>
										<td>Lance</td>
										<td>Timer</td>
									</tr>
									<tr>
										<td>Jojoejoe3</td>
										<td>Web designer/manager</td>
									</tr>
								</tbody>
							</table>
							<hr />
						</div>
						<div className="FAQ">
							<h2>FAQ</h2>
							<ul className="vl">
								<li>Q: Are you going to edit or are you currently editing <i>blank episode</i>?</li>
								<li>A: Please look at the arcs in the main page, the ones marked incomplete are still in progress and not currently finished. However for any arcs not started we cannot make any promises they will be completed.</li>
								<li>Q: Some chapters in between are missing, where are they?</li>
								<li>A: We don&#39;t work in sequential order, we prioritize arcs that need it most or ones we think would be fun to edit.</li>
								<li>Q: What editing software do you use?</li>
								<li>A: Vegas Pro 14.0.</li>
								<li>Q: I&#39;d like to support you, where is the donations link?</li>
								<li>A: We cannot accept donations due to this being legally gray, we do this for fun and for the community. We appreciate that you would want to support us though.</li>
								<li>Q: If there&#39;s a really cool filler moment in the anime, will One Pace leave it in?</li>
								<li>A: No, we cut anything that can be cut unless the music doesn&#39;t allow or it&#39;s something that makes logical sense to show. We try to stay as close to the manga as possible.</li>
							</ul>
							<hr />
						</div>
					</div>
				</Layout>
			</div>
		);
	}
}
