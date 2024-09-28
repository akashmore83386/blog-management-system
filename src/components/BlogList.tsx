import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/BlogList.module.scss';

interface BlogPost {
  id: number;
  title: string;
  content: string;
}

interface State {
  posts: BlogPost[];
  searchQuery: string;
}

class BlogList extends Component<{}, State> {
  state: State = {
    posts: [],
    searchQuery: '',
  };

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = async () => {
    const response = await axios.get<BlogPost[]>('http://localhost:3001/posts');
    this.setState({ posts: response.data });
  };

  handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: e.target.value });
  };

  render() {
    const { posts, searchQuery } = this.state;
    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className={styles.blogList}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={this.handleSearch}
        />
        {filteredPosts.map((post) => (
          <div key={post.id} className={styles.blogCard}>
            <Link to={`/posts/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
          </div>
        ))}
        <Link to="/create">Create New Post</Link>
      </div>
    );
  }
}

export default BlogList;
