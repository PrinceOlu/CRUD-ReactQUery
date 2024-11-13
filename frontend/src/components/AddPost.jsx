import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { useMutation } from '@tanstack/react-query';
import { createPost } from '../api/postApi';
import { useNavigate } from 'react-router-dom';

function AddPost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // Ensure content is correctly initialized

  // Handlers for title and content
  const handleTitle = (e) => setTitle(e.target.value);
  const handleContent = (e) => setContent(e.target.value);

  // Mutation for creating a post
  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // Navigate to the home page after post creation
      navigate("/");
    },
  });

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddPost();
  };

  // Function to add the post
  const handleAddPost = () => {
    createPostMutation.mutate({
      title,
      content, // Send content along with title
    });
  };
console.log(title, content);

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card w-100" style={{ maxWidth: '500px' }}>
        <div className="card-body">
          <h4>Add New Post</h4>
          {/* Form with Bootstrap classes */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title:</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={handleTitle}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">Content:</label>
              <textarea
                className="form-control"
                id="content"
                value={content} // Make sure the value is correctly bound
                onChange={handleContent} // Make sure the handler is correctly updating state
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              {createPostMutation.isLoading ? 'Adding Post...' : 'Add Post'}
            </button>
          </form>
          {/* Optionally, show an error message */}
          {createPostMutation.isError && (
            <div className="alert alert-danger mt-3">
              Error: {createPostMutation.error.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddPost;
