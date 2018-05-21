import React from "react";
import NetworkHandler from "../NetworkHandler";
import Layout from "./Layout";
import FontAwesome from "react-fontawesome";

export default class Watch extends React.Component {
  state = {
    "arcs": [],
    "episodes": [],
    "selectedArc": null,
    "selectedEpisode": null,
    darkMode :false
  };
  componentDidMount() {
    var darkMode = localStorage.getItem("darkMode");
    if(darkMode == null){
      darkMode = false;
    }
    this.setState({darkMode});
    NetworkHandler.request("/get_streams.php", {}, (response) => {
      const {
        arcs,
        episodes,
      } = response;
      let selectedEpisodeId = this.props.location.query.episode;
      let selectedArc = null;
      let selectedEpisode = null;
      if (selectedEpisodeId == null || selectedEpisodeId <= 0) {
        selectedEpisodeId = localStorage.getItem("watchSelectedEpisodeId");
      }
      if (selectedEpisodeId != null && selectedEpisodeId > 0) {
        [selectedEpisode] = episodes.filter((i) => i.id == selectedEpisodeId);
        [selectedArc] = arcs.filter((i) => i.id == selectedEpisode.arcId);
      }
      if (arcs.length > 0 && selectedEpisode == null) {
        [selectedArc] = arcs;
        [selectedEpisode] = episodes.filter((i) => i.arcId == selectedArc.id);
      }
      this.setState({
        "selectedArc": selectedArc,
        "selectedEpisode": selectedEpisode,
        "arcs": arcs,
        "episodes": episodes,
      });
    });
  }
  changeArc = (arcId) => {
    let selectedArc = null;
    let selectedEpisode = null;
    if (this.state.arcs.length > 0) {
      [selectedArc] = this.state.arcs.filter((i) => i.id === arcId);
      [selectedEpisode] = this.state.episodes.filter((i) => i.arcId == arcId);
      localStorage.setItem("watchSelectedEpisodeId", selectedEpisode.id);
    }
    this.setState({
      "selectedArc": selectedArc,
      "selectedEpisode": selectedEpisode,
    });
    this.videoRef.load();
  }
  changeEpisode = (episodeId) => {
    const [selectedEpisode] = this.state.episodes.filter((i) => i.id === episodeId);
    const [selectedArc] = this.state.arcs.filter((i) => i.id === selectedEpisode.arcId);
    localStorage.setItem("watchSelectedEpisodeId", selectedEpisode.id);
    this.setState({
      "selectedEpisode": selectedEpisode,
      "selectedArc": selectedArc,
    });
    this.videoRef.load();
  }
  nav = (dir) => {
    const episodes = this.state.episodes.filter((i) => i.isReleased);
    for (let i = 0; i < episodes.length; i++) {
      const episode = episodes[i];
      if (episode.id === this.state.selectedEpisode.id) {
        if (!((dir == "prev" && i == 0) || (dir == "next" && i >= episodes.length - 1))) {
          const otherEpisode = episodes[dir == "prev" ? i - 1 : i + 1];
          this.changeEpisode(otherEpisode.id);
        }
        break;
      }
    }
  }
  render() {
    const { selectedArc, selectedEpisode, arcs } = this.state;
    var darkMode = this.state.darkMode;
    const episodes = selectedEpisode != null && selectedEpisode.episodes != null && selectedEpisode.episodes.length > 0 ? "Episodes: " + selectedEpisode.episodes : "";
    const chapters = selectedEpisode != null && selectedEpisode.chapters != null && selectedEpisode.chapters.length > 0 ? "Chapters: " + selectedEpisode.chapters : "";
    const torrent = selectedArc != null && selectedArc.torrent.length ? selectedArc.torrent : selectedEpisode != null && selectedEpisode.torrent.length ? selectedEpisode.torrent : null;
    const magnet = selectedArc != null && selectedArc.magnet.length ? selectedArc.magnet : selectedEpisode != null && selectedEpisode.magnet.length ? selectedEpisode.magnet : null;
    const animetoshoq = selectedArc != null && selectedEpisode == null ? "One Pace " + selectedArc.title : selectedEpisode != null ? selectedEpisode.crc32 : null;
    return (
      <div className={darkMode?"darkmode":""} style={{height:"100%"}}>
        <Layout>
          <div className="watch-container">
            <iframe style={{"display": "none"}} name="magnetframe"></iframe>
            <div className="top">
              <select
                className="arcs"
                value={selectedArc == null ? 0 : selectedArc.id}
                onChange={(e) => this.changeArc(e.target.value)}
              >
                {
                  (arcs.length == 0 && <option>Loading...</option>) ||
                  arcs.map((arc, i) => {
                    let title = "[One Pace]";
                    title += arc.chapters != null && arc.chapters.length > 0 ? "[" + arc.chapters + "]" : "";
                    title += arc.title != null && arc.title.length > 0 ? " " + arc.title : " Untitled";
                    title += arc.resolution != null && arc.resolution.length > 0 ? " [" + arc.resolution + "]" : "";
                    title += arc.released ? "" : " (Unreleased)";
                    return <option disabled={!arc.released} key={"arc" + i} value={arc.id}>{title}</option>;
                  })
                }
              </select>
              <select
                className="episodes"
                value={selectedEpisode == null ? 0 : selectedEpisode.id}
                onChange={(e) => this.changeEpisode(e.target.value)}>
                {
                  (this.state.episodes.length == 0 && <option>Loading...</option>) ||
                  this.state.episodes.filter((i) => i.arcId == selectedArc.id).map((episode, i) => {
                    let title = "[One Pace]";
                    title += episode.chapters != null && episode.chapters.length > 0 ? "[" + episode.chapters + "]" : "";
                    title += episode.part != null ? " " + selectedArc.title + " " + ("00" + episode.part.toString()).slice(-2) : episode.title.length > 0 ? " " + episode.title : "";
                    title += " [" + episode.resolution + "]";
                    title += episode.crc32 != null && episode.crc32.length > 0 ? "[" + episode.crc32 + "]" : "";
                    const status = episode.status.length > 0 ? " (" + episode.status + ")" : !episode.isReleased ? " (Unreleased)" : "";
                    title += status;
                    return <option disabled={!episode.isReleased} key={"episode" + i} value={episode.id}>{title}</option>;
                  })
                }
              </select>
              <span className="nav prev" onClick={() => this.nav("prev")}>&lt; Previous</span>
              <span className="nav next" onClick={() => this.nav("next")}>Next &gt;</span>
              {torrent != null &&
                <span>
                  <a className="torrent" href={torrent}>
                    <FontAwesome name="download" /> Torrent
                  </a>
                  <a className="magnet" href={magnet}>
                    <FontAwesome name="magnet" /> Magnet
                  </a>
                </span>
              }
              {animetoshoq != null &&
                <a target="_blank" rel="noopener noreferrer" className="animetosho" href={"https://animetosho.org/search?q=" + animetoshoq}>
                  <FontAwesome name="link" /> Anime Tosho
                </a>
              }
              <span className="episodes">{episodes}</span>
              <span className="chapters">{chapters}</span>
              <span className="button" style={{padding:"10px"}} onClick={() => {
                darkMode = !darkMode;
                localStorage.setItem("darkMode", darkMode);
                this.setState({darkMode});
              }}>Toggle dark mode</span>
            </div>
            <video ref={(i) => this.videoRef = i} className="video-player" controls poster="assets/logo-poster.png">
              {
                selectedEpisode != null && <source type="video/mp4" src={"http://onepace.net/streams/" + selectedEpisode.crc32 + ".mp4"} />
              }
            </video>
          </div>
        </Layout>
      </div>
    );
  }
}
