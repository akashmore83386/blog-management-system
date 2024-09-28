import React, { Component } from "react";
import axios from "axios";
import styles from "../styles/PostForm.module.scss";
import { withRouter, RouterProps } from "../withRouter";

interface Props {
  router: RouterProps;
}

interface State {
  title: string;
  content: string;
}

class PostForm extends Component<Props, State> {
  state: State = {
    title: "",
    content: "",
  };

  componentDidMount() {
    const { id } = this.props.router.params;
    if (id) {
      this.fetchPost(id);
    }
  }

  fetchPost = async (id: string) => {
    const response = await axios.get(`http://localhost:3001/posts/${id}`);
    const { title, content } = response.data;
    this.setState({ title, content });
  };

  handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    this.setState({ [e.target.name]: e.target.value } as Pick<
      State,
      keyof State
    >);
  };

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { id } = this.props.router.params;
    const { title, content } = this.state;

    if (id) {
      await axios.put(`http://localhost:3001/posts/${id}`, { title, content });
    } else {
      await axios.post("http://localhost:3001/posts", { title, content });
    }

    this.props.router.navigate("/");
  };

  render() {
    const { title, content } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={styles.postForm}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={this.handleChange}
          placeholder="Title"
          required
        />
        <textarea
          name="content"
          value={content}
          onChange={this.handleChange}
          placeholder="Content (Markdown supported)"
          required
        />
        <button type="submit">Save</button>
      </form>
    );
  }
}

export default withRouter(PostForm);
