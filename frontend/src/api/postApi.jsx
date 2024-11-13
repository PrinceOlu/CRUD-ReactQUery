// Function to fetch all posts
export const fetchPosts = async () => {
  const response = await fetch("http://localhost:3000/posts");
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


