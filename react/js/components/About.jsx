import React from "react";
import Layout from './Layout';

export default class About extends React.Component {
  render() {
    return (
      <div>
        <Layout>
          <div className="row">
            <h2 className="h2">Info</h2>
            <p>One Pace is a One Piece project that condenses the anime into more accurate adaptations of the manga. It involves removing filler scenes, shortening slow or padded scenes, and merging episodes together</p>
            <hr />
            <h2>Team Members</h2>
            <ul>
              <li>Sewil &nbsp; Editor</li>
              <li>Galaxy 9000</li>
              <li>Feeso</li>
              <li>Halee</li>
              <li>Datenshi</li>
              <li>Grug</li>
              <li>Pepperjack</li>
              <li>KatiouYahiko</li>
              <li>Rael</li>
              <li>Lance</li>
            </ul>
          </div>
        </Layout>
      </div>
    );
  }
}
