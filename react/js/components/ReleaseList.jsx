import React from "react";
import NetworkHandler from "../NetworkHandler";
import Moment from "moment";

export default class ReleaseList extends React.Component {
  state = {
    "releases": [],
  }

  componentDidMount() {
    NetworkHandler.request("/getreleases.php", {}, (responseJson) => {
      let releases = responseJson.releases.sort((a, b) => a.createddate < b.createddate);
      releases = this.props.newOnly ? releases.filter((i) => i.ageDays <= 30) : releases;
      this.setState({ "releases": releases });
    }, null);
  }

  render() {
    return (
      <table className="releases">
        <tbody>
          {
            this.state.releases.map((i) => {
              const createddate = Moment.unix(i.createddate).format("YYYY-MM-DD");
              return (
                <tr key={"release-" + i.crc32}>
                  <td className="name" width="80%">{i.name}</td>
                  <td>{createddate}</td>
                  <td><a href={i.magnet}>Magnet</a></td>
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
