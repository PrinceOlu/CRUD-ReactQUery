import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/postApi';

function AddPost() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleTitle = (e) => setTitle(e.target.value);
  const handleAuthor = (e) => setAuthor(e.target.value);

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // Invalidate and refetch the posts query to update the list
      queryClient.invalidateQueries(['posts']);
      navigate("/");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddPost();
  };

  const handleAddPost = () => {
    createPostMutation.mutate({
      title,
      author,
    });
  };
   return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card w-100" style={{ maxWidth: '500px' }}>
        <div className="card-body">
          <h4>Add New Post</h4>
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
              <label htmlFor="author" className="form-label">Author:</label>
              <textarea
                className="form-control"
                id="author"
                value={author}
                onChange={handleAuthor}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              {createPostMutation.isLoading ? 'Adding Post...' : 'Add Post'}
            </button>
          </form>
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
