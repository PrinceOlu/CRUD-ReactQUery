import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function EditPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Handler for title
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  // Handler for content
  const handleContent = (e) => {
    setContent(e.target.value);
  };

  // Function to submit data
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Title:", title);
    console.log("Content:", content);
    // You can now send `title` and `content` to your server or further processing
  };

  return (
   
      
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card w-100" style={{ maxWidth: '500px' }}>
        <div className="card-body">
          
          {/* Form with Bootstrap classes */}
          <form onSubmit={handleSubmit}>
          <h4>Edit Post</h4>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title:</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}          // Binding state variable to value
                onChange={handleTitle}  // Setting the handler for changes
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">Content:</label>
              <textarea
                className="form-control"
                id="content"
                value={content}        // Binding state variable to value
                onChange={handleContent} // Setting the handler for changes
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Add Post</button>
          </form>
        </div>
      </div>
   
    </div>
  )
}

export default EditPost;
