import React from "react";
import Layout from "./Layout";

export default class About extends React.Component {
  render() {
    return (
      <Layout>
        <div className="text">
          <div className="about">
            <h2>About</h2>
            <p>
              One Pace is a One Piece project that condenses the anime into more accurate adaptations of the manga. It involves removing filler scenes, shortening slow or padded scenes, and merging episodes together.
            </p>
          </div>
          <div className="members">
            <h2>Members</h2>
            <ul>
              <li>Sewil<span style={{
                "marginLeft": "58px",
              }}>Editor</span></li>
              <li>Galaxy 9000<span style={{
                "marginLeft": "13px",
              }}>Editor</span></li>
              <li>Feeso<span style={{
                "marginLeft": "53px",
              }}>Editor</span></li>
              <li>Halee<span style={{
                "marginLeft": "53px",
              }} className="help" title="Finds the soundtracks that plays in the anime, and manages the One Piece Track List (http://onepiecetracklist.com), a megalist of the timestamps for the released soundtracks that have ever occured in the One Piece Anime.">Soundtracker</span></li>
              <li>Datenshi<span style={{
                "marginLeft": "34px",
              }} className="help" title="Makes our custom infoboxes and title cards and occasionally edits out non-canon characters from scenes or shots.">Timer, graphics</span></li>
              <li>Grug<span style={{
                "marginLeft": "59px",
              }}>QCer</span></li>
              <li>Pepperjack<span style={{
                "marginLeft": "18px",
              }}>QCer</span></li>
              <li>KaitouYahiko<span style={{
                "marginLeft": "7px",
              }}>Karaoke Effects, graphics</span></li>
              <li>Rael<span style={{
                "marginLeft": "61px",
              }}>QCer</span></li>
              <li>Lance<span style={{
                "marginLeft": "52px",
              }}>Timer</span></li>
            </ul>
          </div>
          <div className="links">
            <h2>Links</h2>
            <ul>
              <li><a target="_blank" rel="noopener noreferrer" href="https://discordapp.com/invite/uzmumFv">Discord</a></li>
              <li><a target="_blank" rel="noopener noreferrer" href="http://forums.arlongpark.net/showthread.php?t=38681">Arlong Park Forums Thread</a></li>
              <li><a target="_blank" rel="noopener noreferrer" href="https://onedrive.live.com/view.aspx?resid=2A9137DBF1112637!37021&ithint=file%2cxlsx&app=Excel&authkey=!ACgbEWtkXaBEMC0">One Pace Excel Chart</a></li>
              <li><a target="_blank" rel="noopener noreferrer" href="http://onepiecetracklist.com">One Piece Track List</a></li>
            </ul>
          </div>
        </div>
      </Layout>
    );
  }
}
