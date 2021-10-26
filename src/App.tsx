
import './stylesheets/App.scss';
import Posts from './components/Posts';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/Header';
import Sidebar from './components/SideBar';
import SinglePost from './components/SinglePost';
import LogoutPage from './components/LogoutPage';
import MyComments from './components/MyComments';
import SearchResults from './components/SearchResults';

const App =()  =>{

  // client = https://protected-bastion-58031.herokuapp.com/
  return (
    <div>
      
      <Router>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/logoutpage">
            <LogoutPage />
          </Route>
          <Route path="/myposts">
            <div className="app-container">
              <Sidebar /> 
              <div className="app-body">
                <Header />
                <Posts />
              </div>
              
            </div>
          </Route>
          <Route path="/posts/:time">
            <div className="app-container">
              <Sidebar /> 
              <div className="app-body">
                <Header />
                <Posts />
              </div>
              
            </div>
          </Route>
          <Route path="/mycomments">
          <div className="app-container">
              <Sidebar /> 
              <div className="app-body">
                <Header />
                <MyComments />
              </div>
              
            </div>
          </Route>
          <Route path="/post/:id">
            <div className="app-container">
              <Sidebar /> 
              <div className="app-body">
                <Header />
                <SinglePost />
              </div>
              
            </div>
          </Route>
          <Route path="/search/:fraze">
            <div className="app-container">
              <Sidebar /> 
              <div className="app-body">
                <Header />
                <SearchResults />
              </div>
              
            </div>
          </Route>
          <Route path="/">
            <div className="app-container">
              <Sidebar /> 
              <div className="app-body">
                <Header />
                <Posts />
              </div>
              
            </div>
          </Route>
        </Switch>
      </Router>
      {/* <Post title="Post 2" body="body 2" author={authors[1]}/>
      <Post title="Post 3" body="body 3" author={authors[2]}/> */}
    </div>
  );
}

export default App;
