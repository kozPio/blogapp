
import './stylesheets/App.css';
import Post from './components/Post';
import LoginPage from './components/LoginPage'
import { useState } from 'react';

const App =()  =>{
  const [authors, setAuthors ]= useState([{name: "Hero 1"},{name: "Hero 2"},{name: "Hero 3"}])

  return (
    <div>
      <LoginPage />
      {/* <Post title="Post 1" body="body 1" author={authors[0]}/> */}
      {/* <Post title="Post 2" body="body 2" author={authors[1]}/>
      <Post title="Post 3" body="body 3" author={authors[2]}/> */}
    </div>
  );
}

export default App;
