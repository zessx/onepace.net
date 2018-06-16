import React from "react";
import ReactDOM from "react-dom";
import {
	Router,
	Route,
	hashHistory,
	IndexRoute,
} from "react-router";
import "../../index.css";
import "babel-polyfill";
import Layout from "./Layout";
import Watch from "./Watch";
import About from "./About";
import Torrents from "./Torrents";
import Progress from "./Progress/Progress";

export default class Index extends React.Component {
	componentDidMount() {
		document.title = "One Pace | Home";
	}
	render() {
		return (
			<Layout>
				<Watch location={this.props.location} />
			</Layout>
		);
	}
}

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/(?episode=:episode)">
			<IndexRoute component={Index} />
			<Route name="torrents" path="/torrents" component={Torrents} />
			<Route name="about" path="/about" component={About} />
			<Route name="progress" path="/progress" component={Progress} />
		</Route>
	</Router>,
	document.getElementById("reactentry")
);
