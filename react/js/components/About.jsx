import React from "react";
import ReleaseList from "./ReleaseList";

export default class About extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="main">
          <div className="card">
            <h2>Info</h2>
            <p>One Pace is a One Piece project that condenses the anime into more accurate adaptations of the manga. It involves removing filler scenes, shortening slow or padded scenes, and merging episodes together</p>
            <hr />
            <div className="section">
              <h2>New releases</h2>
              <ReleaseList newOnly={true} />
              <hr />
            </div>
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
        </div>
        <div className="side">
          <div className="card">
            <h2>Links</h2>
            <ul>
              <li><a target="_blank" rel="noopener noreferrer" href="http://forums.arlongpark.net/showthread.php?t=38681">Arlong Park Forums Thread</a></li>
              <li><a target="_blank" rel="noopener noreferrer" href="https://onedrive.live.com/view.aspx?resid=2A9137DBF1112637!37021&ithint=file%2cxlsx&app=Excel&authkey=!ACgbEWtkXaBEMC0">One Pace Excel Chart</a></li>
              <li><a target="_blank" rel="noopener noreferrer" href="http://onepiecetracklist.com">One Piece Track List</a></li>
            </ul>
            <hr />
            <center><iframe src="https://discordapp.com/widget?id=229653982530764800&theme=dark" width="350px" height="500px" allowtransparency="true" border></iframe></center>
          </div>
        </div>
      </div>
    );
  }
}
