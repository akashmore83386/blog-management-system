import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import BlogList from './components/BlogList';
import PostDetails from './components/PostDetails';
import PostForm from './components/PostForm';

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/create" element={<PostForm />} />
        <Route path="/edit/:id" element={<PostForm />} />
      </Routes>
    );
  }
}

export default App;
