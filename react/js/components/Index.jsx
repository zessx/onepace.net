import React from "react";
import ReactDOM from "react-dom";
import {
	Router,
	Route,
	browserHistory,
	IndexRoute
} from "react-router";
import "babel-polyfill";
import Watch from "./Watch";
import About from "./About";
import Donate from "./Donate";
import Layout from "./Layout";
import HttpsRedirect from 'react-https-redirect';

ReactDOM.render(
	<HttpsRedirect>
		<Layout>
			<Router history={browserHistory}>
				<Route path="/(?episode=:episode)">
					<IndexRoute component={Watch} />
					<Route name="about" path="/about" component={About} />
					<Route name="donate" path="/donate" component={Donate} />
				</Route>
			</Router>
		</Layout>
	</HttpsRedirect>, document.getElementById("reactentry")
);
