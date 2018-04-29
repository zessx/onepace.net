import React from 'react';
import Post from './Post';
import NetworkHandler from '../NetworkHandler';

export default class Posts extends React.Component {
  state = {
    posts: []
  };
  componentWillMount() {
    NetworkHandler.request("/get_posts.php", {}, response => {
      this.setState({ posts: response.posts });
    }, error => {
    });
  }
  render() {
    return (
      <div className="posts">
        {this.state.posts.map((val, i) => <Post key={i} post={val} />)}
      </div>
    );
  }
}
