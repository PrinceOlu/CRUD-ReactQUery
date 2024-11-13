import React from 'react'
import { deletePost, fetchPosts } from '../api/postApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { useNavigate } from 'react-router-dom'

function PostList() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // Query to fetch posts
  const { isLoading, isError, data: posts, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })

  // Mutation to delete a post
  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      // Invalidate and refetch posts after a successful delete
      queryClient.invalidateQueries(['posts'])
    },
  })

  // Function to navigate to add post page
  const handleAddPost = () => navigate(`/add-post`)

  // Function to navigate to post details
  const handleDetails = (postId) => navigate(`/post/${postId}`)

  // Function to navigate to edit page
  const handleEdit = (postId) => navigate(`/edit-post/${postId}`)

  // Function to handle delete
  const handleDelete = (postId) => {
    deletePostMutation.mutate(postId)  // Pass the post ID directly
  }

  if (isLoading) return <span>Loading...</span>
  if (isError) return <span>Error: {error.message}</span>

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="table-responsive" style={{ width: '80%' }}>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>
                Actions{' '}
                <button className="btn btn-secondary me-2" onClick={handleAddPost}>
                  <i className="fas fa-plus"></i> Add Post
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((post) => (
              <tr key={post.id}>
                <td
                  onClick={() => handleDetails(post.id)}
                  style={{ cursor: 'pointer', color: 'blue' }}
                >
                  {post.title}
                </td>
                <td
                  onClick={() => handleDetails(post.id)}
                  style={{ cursor: 'pointer', color: 'blue' }}
                >
                  {post.author}
                </td>
                <td>
                  <button className="btn btn-secondary me-2" onClick={() => handleEdit(post.id)}>
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(post.id)}>
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PostList
