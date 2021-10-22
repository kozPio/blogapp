
import './stylesheets/App.css';
import Posts from './components/Posts';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/Header';
import Sidebar from './components/SideBar';

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
