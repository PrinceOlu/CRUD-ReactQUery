import React from 'react'
import {fetchPosts} from '../api/postApi'
import { useQuery } from '@tanstack/react-query'
import '@fortawesome/fontawesome-free/css/all.min.css' // Import FontAwesome
import { useNavigate } from 'react-router-dom' // Corrected import


function PostList() {
  const navigate = useNavigate()
// Query to fetch post API
  const { isLoading, isError, data: posts, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  // Function to navigate to details page
  const handleDetails = (postId) => {
    navigate(`/post/${postId}`)
  }
  // Function to navigate to Edit page
  const handleEdit = (postId) => {
    navigate(`/edit-post/${postId}`)
  }
  // Function to Add New Post
  const handleAddPost = () => {
    navigate(`/add-post`)
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="table-responsive" style={{ width: '80%' }}>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Actions <button className="btn btn-secondary me-2" onClick={handleAddPost}>
                <i className="fas fa-plus"></i> Add Post
                  </button></th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((post) => (
              <tr key={post.id}>
                <td onClick={() => handleDetails(post.id)} style={{ cursor: 'pointer', color: 'blue' }}>
                  {post.title}
                </td>
                <td onClick={() => handleDetails(post.id)} style={{ cursor: 'pointer', color: 'blue' }}>
                  {post.author}
                </td>
                <td>
                  {/* Edit Button with FontAwesome Icon */}
                  <button className="btn btn-secondary me-2" onClick={() => handleEdit(post.id)}>
                    <i className="fas fa-edit"></i>
                  </button>
                  {/* Delete Button with FontAwesome Icon */}
                  <button className="btn btn-danger">
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
