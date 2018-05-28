import React from "react";
import Layout from './Layout';

export default class About extends React.Component {
  render() {
    return (
      <div>
        <Layout>
          <div className="row">
            <h2 className="h2">What is One Pace?</h2>
            <p>One Pace is a One Piece project that condenses the anime into more accurate adaptations of the manga. It involves removing filler scenes, shortening slow or padded scenes, and merging episodes together</p>
            <hr />
            <h2>FAQ</h2>
            <p><b>Q: </b> Are you going to edit/are you editing "insert arc"?<br /></p>
            <p><b>A: </b> Take a look at the watch page to see what arcs are completed and still incomplete or still in progress.</p>
            <p><b>Q:</b> Some chapters in between are missing where are they?<br /></p>
            <p><b>A:</b> We don't work in sequential order, but instead, we prioritize the arcs that need the re-editing the most, and the arcs we think would be fun to edit.</p>
            <p><b>Q: </b>What software are you using?<br /></p>
            <p><b>A: </b>Vegas Pro 14.0</p>
            <p><b>Q: </b>Is "Insert Episode Here" ready to be released?<br /></p>
            <p><b>A: </b>If it's not currently on the site, then no. Join </p>
            <p><b>Q:</b><br /></p>
            <p><b>A:</b></p>
            <p><b>Q:</b><br /></p>
            <p><b>A:</b></p>
            <p><b>Q:</b><br /></p>
            <p><b>A:</b></p>
            <p><b>Q:</b><br /></p>
            <p><b>A:</b></p>
            <hr />
            <h2>Team Members</h2>
            <p>Sewil Editor</p><br />
            <p>Galaxy 9000 Editor</p><br />
          </div>
        </Layout>
      </div>
    );
  }
}
