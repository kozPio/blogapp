import '../stylesheets/Sidebar.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';

const Sidebar: React.FC = () => {

  const [show, setShow]=useState(false);

  const token = localStorage.getItem('token');

  const reveal = () => {
    setShow(!show)
  }

  return (<div className="sidebar">
     <Link to={{
            pathname: "/",
            state: {
              user: false
            }
          }}> 
        <img className="sidebar-logo" src="https://www.pikpng.com/pngl/m/2-24867_random-logo-png-transparent-random-brand-logos-png.png" alt="" />
    </Link>
    <Link to={{
            pathname: "/",
            state: {
              user: false
            }
          }}> 
        <div className="sidebar-option"><p>All Posts</p></div>
      </Link>
      <Link to={{
            pathname: "/posts/latest",
          }}>
        <div className="sidebar-option"><p>Latest Post</p></div>
      </Link>
    <Link to={{
            pathname: "/posts/old",
            state: {
              user:  false
            }
          }}>
      <div className="sidebar-option"><p>Old Posts</p></div>
    </Link>
    {token &&<div className="sidebar-option sidebar-reveal" onClick={()=> reveal()}>
      <p>Manage your uploads</p><FontAwesomeIcon icon={faArrowAltCircleDown} color="#a99888"/>
    </div>}
      {show && <div>
          <Link to={{
            pathname: "/myposts",
            state: {
              user: token ? true : false
            }
          }}>
            <p className="sidebar-show">Menage your posts</p>
          </Link>
          <Link to={{
            pathname: "/mycomments"
          }}>
            <p className="sidebar-show">Manage your comments</p>
          </Link>
        </div>}
        
      

  </div>)
}

export default Sidebar;