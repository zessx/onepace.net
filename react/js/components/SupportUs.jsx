import React from "react";
import Layout from "./Layout";

export default class SupportUs extends React.Component {
	componentDidMount() {
		document.title = "One Pace | Support us";
	}
	render() {
		return (
			<Layout className="with-padding">
				Send Bitcoin: <a href="bitcoin:39GmGwQAzdRYXGxmyA9XBXoTSGt1ZXTqeN" target="_blank">39GmGwQAzdRYXGxmyA9XBXoTSGt1ZXTqeN</a>
				<br />
				Mine Monero:
				<br />
				<iframe src="/mine" style={{minHeight: "310px", border: "none", padding: 0}}></iframe>
			</Layout>
		);
	}
}
