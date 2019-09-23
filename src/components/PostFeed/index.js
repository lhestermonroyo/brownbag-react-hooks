import React, { Component } from 'react';
import uuid from 'uuid';
import axios from 'axios';

class PostFeed extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      title: '',
      body: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        this.setState({
          posts: res.data,
        })
      })
      .catch((err) => console.log(err));
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    const { title, body, posts } = this.state;
    const postData = {
      userId: 1,
      id: uuid.v1(),
      title: title,
      body: body,
    };

    this.setState({
      posts: [postData, ...posts],
    })
  }
  render() {
    const { title, body, posts } = this.state;
    return (
      <>
        <div className="container">
          <h1 className="form-title">Post Something...</h1>
          <form onSubmit={this.handleSubmit}>
            <label>Title</label>
            <input className="form-input" type="text" name="title" onChange={this.handleChange} value={title}/>
            <br/>
            <label>Body</label>
            <textarea className="form-input" name="body" rows="4" onChange={this.handleChange} value={body}/>
            <br/>
            <button className="form-button" type="submit">Add Post</button>
          </form>
        </div>
        <div className="container">
          {posts ? 
            posts.map((post, i) => {
              return (
                <div key={i} className="card">
                  <h4>{post.title}</h4>
                  <p>{post.body}</p>
                </div>
              )
            })
          :
            <p>Loading...</p>
          }
        </div>
      </>
    )
  }
}

export default PostFeed;
