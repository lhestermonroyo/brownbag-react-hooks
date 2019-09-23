import React, { useState, useEffect } from 'react';
import uuid from 'uuid';
import axios from 'axios';

const useForm = (initialState) => {
  const [values, setValues] = useState(initialState);

  return [
    values,
    e => {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      })
    }
  ]
}

const PostFeed = () => {
  const [posts, setPosts ] = useState([]);
  const [values, handleChange] = useForm({ title: '', body: '' });

  // componentDidMount
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = {
      userId: 1,
      id: uuid.v1(),
      title: values.title,
      body: values.body,
    };

    setPosts([postData, ...posts]);
  }

  return (
    <>
      <div className="container">
        <h1 className="form-title">Post Something...</h1>
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input className="form-input" type="text" name="title" onChange={handleChange} value={values.title}/>
          <br/>
          <label>Body</label>
          <textarea className="form-input" name="body" rows="4"  onChange={handleChange} value={values.body}/>
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

export default PostFeed;
