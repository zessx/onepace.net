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
                 <li>One Pace is a One Piece project that condenses the anime into more accurate adaptations of the manga.
                  It involves removing filler scenes, shortening slow or padded scenes, and merging episodes together.</li>
              </ul>
               <hr />
            </div>
            <div className="members">
               <h2>One Pace Team</h2>
               <ul className="vl">
                  <li>Sewil<span style={{
                     "marginLeft": "58px",
                     }}>Editor</span>
                  </li>
                  <li>Galaxy 9000<span style={{
                     "marginLeft": "13px",
                     }}>Editor</span>
                  </li>
                  <li>Feeso<span style={{
                     "marginLeft": "53px",
                     }}>Editor</span>
                  </li>
                  <li>Halee<span style={{
                     "marginLeft": "53px",
                     }} className="help" title="Finds the soundtracks that plays in the anime, and manages the One Piece Track List (http://onepiecetracklist.com), a megalist of the timestamps for the released soundtracks that have ever occured in the One Piece Anime.">Soundtracker</span>
                  </li>
                  <li>Datenshi<span style={{
                     "marginLeft": "34px",
                     }} className="help" title="Makes our custom infoboxes and title cards and occasionally edits out non-canon characters from scenes or shots.">Timer, graphics</span>
                  </li>
                  <li>Grug<span style={{
                     "marginLeft": "59px",
                     }}>QCer</span>
                  </li>
                  <li>Pepperjack<span style={{
                     "marginLeft": "18px",
                     }}>QCer</span>
                  </li>
                  <li>KaitouYahiko<span style={{
                     "marginLeft": "7px",
                     }}>Karaoke Effects, graphics</span>
                  </li>
                  <li>Rael<span style={{
                     "marginLeft": "61px",
                     }}>QCer</span>
                  </li>
                  <li>Lance<span style={{
                     "marginLeft": "52px",
                     }}>Timer</span>
                  </li>
                  <li>Jojoejoe3<span style={{
                    "marginLeft": "28px",
                  }}>Website</span>
                  </li>
               </ul>
               <hr />
            </div>
            <div className="FAQ">
              <h2>FAQ</h2>
              <ul className="vl">
                <li>Q: Are you going to edit or are you currently editing <i>blank episode</i>?</li>
                <li>A: Please look at the arcs in the main page, the ones marked incomplete are still in progress and notcurrently finished. However for any arcs not started we cannot make any promises they will be completed.</li>
                <li>Q. Some chapters in between are missing, where are they?</li>
                <li>A: We don't work in sequential order, we prioritize arcs that need it most or ones we think would be fun to edit.</li>
                <li>Q: What editing software do you use?</li>
                <li>A: Vegas Pro 14.0.</li>
                <li>Q: I'd like to support you, where is the donations link?</li>
                <li>A: We cannot accept donations due to this being legally gray, we do this for fun and for the community. We appreciate that you would want to support us though.</li>
                <li>Q: If there's a really cool filler moment in the anime, will One Pace leave it in?</li>
                <li>A: No, we cut anything that can be cut unless the music doesn't allow or it's something that makes logical sense to show. We try to stay as close to the manga as possible.</li>
              </ul>
               <hr />
            </div>
            
            <div className="links">
               <h2>Links</h2>
               <ul className="vl">
                  <li><a target="_blank" rel="noopener noreferrer" href="https://discordapp.com/invite/uzmumFv">Discord</a></li>
                  <li><a target="_blank" rel="noopener noreferrer" href="http://forums.arlongpark.net/showthread.php?t=38681">Arlong Park Forums Thread</a></li>
                  <li><a target="_blank" rel="noopener noreferrer" href="https://onedrive.live.com/view.aspx?resid=2A9137DBF1112637!37021&ithint=file%2cxlsx&app=Excel&authkey=!ACgbEWtkXaBEMC0">One Pace Excel Chart</a></li>
                  <li><a target="_blank" rel="noopener noreferrer" href="http://onepiecetracklist.com">One Piece Track List</a></li>
               </ul>
            </div>
         </div>
      </Layout>
   </div> 
    );
  }
}
