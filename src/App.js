import { Route, Link, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';

import UsersPosts from './UsersPosts';
import PostWithComments from './PostComments';
import EditPost from './EditPost';
import AddPost from './AddPost';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<UsersPosts />} />
          <Route exact path="/post/:id" element={<PostWithComments />} />
          <Route exact path="/edit-post/:id" element={<EditPost />} />
          <Route exact path="/add-post" element={<AddPost />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}


export default App;


