import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchSinglePost } from '../api/postApi';  // Import fetchSinglePost directly

function PostDetails() {
  const navigate = useNavigate()
  const { id } = useParams();

  const { isLoading, isError, data: post, error } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchSinglePost(id),  // directly calling fetchSinglePost
  });

  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>Error: {error.message}</span>;
const handleSubmit = ()=>{
navigate("/")
}
  return (
    <div>
      <h4>Post Details</h4>
      <p><strong>Title:</strong> {post.title}</p>
      <p><strong>Author:</strong> {post.author}</p>
      <button type='submit' onClick={handleSubmit}>Back to List</button>
    </div>
  );
}

export default PostDetails;
