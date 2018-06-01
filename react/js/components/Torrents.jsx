import React from "react";
import NetworkHandler from "../NetworkHandler";
import Moment from "moment";
import Layout from "./Layout";
import { Glyphicon } from "react-bootstrap";

export default class Torrents extends React.Component {
	constructor(props) {
		super(props);
		let sortField = localStorage.getItem("sortField");
		if (sortField == null) {
			sortField = "createddate";
		}
		let sortAscending = localStorage.getItem("sortAscending");
		if (sortAscending == null) {
			sortAscending = true;
		}
		sortAscending = sortAscending === "true";
		this.state = {
			"releases": [],
			"sortField": sortField,
			"sortAscending": sortAscending,
		};
	}
	componentDidMount() {
		document.title = "One Pace | Torrents";
		NetworkHandler.request("/getreleases.php", {}, (responseJson) => {
			let releases = this.sortReleases(responseJson.releases, this.state.sortField, this.state.sortAscending);
			this.setState({ "releases": releases });
		}, null);
	}
	sortReleases = (releases, sortField, sortAscending) => {
		releases = releases.sort((a, b) => sortAscending ?
			(b[sortField] + "").localeCompare(a[sortField], undefined, { numeric: true, sensitivity: "base" }) :
			(a[sortField] + "").localeCompare(b[sortField], undefined, { numeric: true, sensitivity: "base" })
		);
		return releases;
	}
	sort = (sortField, sortAscending) => {
		const releases = this.sortReleases(this.state.releases, sortField, sortAscending);
		localStorage.setItem("sortField", sortField);
		localStorage.setItem("sortAscending", sortAscending);
		this.setState({ releases, sortField, sortAscending });
	}
	render() {
		const { sortField, sortAscending } = this.state;
		const sortArrow = sortAscending ? <Glyphicon glyph="arrow-up" /> : <Glyphicon glyph="arrow-down" />;
		return (
			<div>
				<Layout>
					<div className="card">
						<h2>Torrents</h2>
						<table className="releases vl">
							<thead>
								<tr>
									<th onClick={() => this.sort("name", sortField == "name" && !sortAscending)}>Name {sortField == "name" && sortArrow}</th>
									<th width="10%" onClick={() => this.sort("createddate", sortField == "createddate" && !sortAscending)}>Date {sortField == "createddate" && sortArrow}</th>
									<th>Magnet</th>
									<th>AnimeTosho</th>
								</tr>
							</thead>
							<tbody>
								{
									this.state.releases.map((i, index) => {
										const createddate = Moment.unix(i.createddate).format("YYYY-MM-DD");
										return (
											<tr key={index}>
												<td className="name"><a href={i.torrent}>{i.name}</a></td>
												<td>{createddate}</td>
												<td><a href={i.magnet}>Magnet</a></td>
												<td><a href={"https://animetosho.org/search?q=" + i.crc32} target="_blank">AT</a></td>
											</tr>
										);
									})
								}
							</tbody>
						</table>
					</div>
				</Layout>
			</div>
		);
	}
}
