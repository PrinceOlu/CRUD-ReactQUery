import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PostList from './components/PostList';
import PostDetails from './components/PostDetails';
import EditPost from './components/EditPost';
import AddPost from './components/AddPost';


function App() {

  return (
    <BrowserRouter>
    <h4>Crud Operations using React-Query</h4>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/edit-post/:id" element={<EditPost />} />
        <Route path="/add-post" element={<AddPost />} />
     </Routes>
    </BrowserRouter>
  );
}

export default App;
