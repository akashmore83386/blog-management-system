import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { marked } from 'marked';
import styles from '../styles/PostDetails.module.scss';
import { withRouter, RouterProps } from '../withRouter';

interface Post {
  id: number;
  title: string;
  content: string;
}

interface Props {
  router: RouterProps;
}

interface State {
  post: Post | null;
}

class PostDetails extends Component<Props, State> {
  state: State = {
    post: null,
  };

  componentDidMount() {
    this.fetchPost();
  }

  fetchPost = async () => {
    const { id } = this.props.router.params;
    const response = await axios.get<Post>(`http://localhost:3001/posts/${id}`);
    this.setState({ post: response.data });
  };

  handleDelete = async () => {
    const { id } = this.props.router.params;
    await axios.delete(`http://localhost:3001/posts/${id}`);
    this.props.router.navigate('/');
  };

  render() {
    const { post } = this.state;

    if (!post) return <div>Loading...</div>;

    return (
      <div className={styles.postDetails}>
        <h1>{post.title}</h1>
        <div
        // @ts-ignore
          dangerouslySetInnerHTML={{ __html: marked(post.content) }}
        ></div>
        <button onClick={this.handleDelete}>Delete</button>
        <Link to={`/edit/${post.id}`}>Edit</Link>
      </div>
    );
  }
}

export default withRouter(PostDetails);
