import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchSinglePost, updatePost } from '../api/postApi';

function EditPost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { isLoading, isError, data: post, error } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchSinglePost(id),
    onSuccess: (data) => {
      // Initialize title and author when post data is fetched successfully
      setTitle(data.title);
      setAuthor(data.author);
    },
  });

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleTitle = (e) => setTitle(e.target.value);
  const handleAuthor = (e) => setAuthor(e.target.value);

  const editPostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      navigate("/");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditPost();
  };

  const handleEditPost = () => {
    // Ensure `id`, `title`, and `author` are passed to updatePost
    editPostMutation.mutate({
      id, // Pass the post ID here
      title,
      author,
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card w-100" style={{ maxWidth: '500px' }}>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <h4>Edit Post</h4>
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
              {editPostMutation.isLoading ? 'Saving Changes...' : 'Save Changes'}
            </button>
          </form>
          {editPostMutation.isError && (
            <div className="alert alert-danger mt-3">
              Error: {editPostMutation.error.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditPost;
