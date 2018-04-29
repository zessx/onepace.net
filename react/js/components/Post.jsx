import React from 'react';
import Moment from 'moment';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: props.post
    };
  }
  render() {
    const { title, author, content, timestamp } = this.state.post;
    const stamp_str = Moment.unix(parseFloat(timestamp)).utc().format("YYYY-MM-DD HH:mm");
    return (
      <div className="post">
        <h2 className="title">{title}</h2>
        <p className="content" dangerouslySetInnerHTML={{__html: content}} />
        <div className="footer">
          <span className="author">{author}</span>
          <span className="timestamp">{stamp_str}</span>
        </div>
      </div>
    );
  }
}
