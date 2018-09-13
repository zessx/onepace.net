import React from "react";

export default class SupportUs extends React.Component {
	componentDidMount() {
		document.title = "One Pace | Donate";
	}
	render() {
		return (
			<div className="with-padding">
				Send Bitcoin: <a href="bitcoin:39GmGwQAzdRYXGxmyA9XBXoTSGt1ZXTqeN" target="_blank">39GmGwQAzdRYXGxmyA9XBXoTSGt1ZXTqeN</a>
				<br />
				Mine Monero:
				<br />
				<iframe src="/mine" style={{minHeight: "310px", border: "none", padding: 0}}></iframe>
			</div>
		);
	}
}
