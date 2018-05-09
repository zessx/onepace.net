import React from "react";
import NetworkHandler from "../NetworkHandler";

export default class ReleaseList extends React.Component {
  state = {
    "releases": [],
  }

  componentDidMount() {
    NetworkHandler.request("/getreleases.php", {}, (responseJson) => {
      this.setState({ "releases": responseJson.releases });
    }, null);
  }

  render() {
    return (
      <table className="releases">
        <tbody>
          {
            this.state.releases.map((i) => {
              return (
                <tr key={"release-" + i.crc32}>
                  <td className="name">{i.name}</td>
                  <td><a href={i.magnet} target="_blank">Magnet</a></td>
                  <td><a href={i.torrent} target="_blank">Torrent</a></td>
                  <td><a href={"https://animetosho.org/search?q=" + i.crc32} target="_blank">AT</a></td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}
