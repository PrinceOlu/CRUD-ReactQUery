// Function to fetch all posts
export const fetchPosts = async () => {
  const response = await fetch('http://localhost:3000/posts'); // Update to match your server URL
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
};

// Function to fetch a single post
export const fetchSinglePost = async (id) => {
  const response = await fetch(`http://localhost:3000/posts/${id}`);
  return response.json();
};
// Function to create a single post
export const createPost = async (newPost) => {
  const response = await fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });
  return response.json();
};
// Function to update a single post
export const updatePost = async (updatedPost) => {
  const response = await fetch(`http://localhost:3000/posts/${updatedPost.id}`, { // Use backticks here
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPost),
  });
  
  if (!response.ok) {
    throw new Error("Failed to update post");
  }
  
  return response.json();
};


// Function to delete a post
export const deletePost = async (id) => {
  if (!id) {
    throw new Error("Invalid post ID for deletion")
  }

  const response = await fetch(`http://localhost:3000/posts/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Failed to delete post")
  }

  return response.json()
}
