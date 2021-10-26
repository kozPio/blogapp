import '../stylesheets/Header.scss';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faRightFromBracket, faUserPlus, faArrowAltCircleDown, faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';




const Header:React.FC = ()=> {
  
  const [searchFraze, setSearchFraze]= useState('')
  const token = localStorage.getItem('token');
  const history = useHistory();
  const [show, setShow]=useState(false);
  const [showSidebar, setShowSidebar]=useState(false);


  const reveal = () => {
    setShow(!show)
  }

  const revealSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  

  const logout = () => {
    localStorage.removeItem('token');
    history.push('/logoutpage')
  }

  const search =  () => {
    history.push({
      pathname: `/search/${searchFraze}`,
    });
  }

  return <div className="header">
    <div className="header-logo-search">
      <div className="header-search">
        <FontAwesomeIcon className="header-magnifyingGlass" icon={faMagnifyingGlass} color="#a99888" /><input value={searchFraze} onChange={(e)=> setSearchFraze(e.target.value)} placeholder="find post" type="text" />
        <span className="header-sign-button" onClick={()=> search()}><p>Search</p></span>
      </div>
    </div>
    <div className="header-sign">
    {token ? <div className="header-sign-user">
      <div>
        <span onClick={() => logout()} className="header-sign-button"><FontAwesomeIcon  icon={faRightFromBracket} color="#a99888" /> <p>Logout</p></span>
      </div>
    </div> : <div className="header-sign-user">
      <Link to="/login">
        <span className="header-sign-button-marg"><FontAwesomeIcon  icon={faRightFromBracket} color="#a99888" /> <p>Login</p></span>
      </Link>
      <Link to="/register">
        <span className="header-sign-button-marg"><FontAwesomeIcon  icon={faUserPlus} color="#a99888" /> <p>Register</p></span>
      </Link>
    </div>}
    <div  className={showSidebar ? "header-hamburger header-hamburger-reveal" : "header-hamburger"  }><span className="header-hamburger-button" onClick={() => revealSidebar()}><FontAwesomeIcon  icon={faBars} color="#a99888" /></span>
      {showSidebar && <div className="sidebar-mobile">
        <Link to={{
                pathname: "/",
                state: {
                  user: false
                }
              }}> 
            <div className="sidebar-option-mobile"><p>All Posts</p></div>
          </Link>
          <Link to={{
                pathname: "/posts/latest",
              }}>
            <div className="sidebar-option-mobile"><p>Latest Post</p></div>
          </Link>
        <Link to={{
                pathname: "/posts/old",
                state: {
                  user:  false
                }
              }}>
          <div className="sidebar-option-mobile"><p>Old Posts</p></div>
        </Link>
        {token &&<div className="sidebar-option-mobile sidebar-reveal-mobile" onClick={()=> reveal()}>
          <p>Manage</p><FontAwesomeIcon icon={faArrowAltCircleDown} color="#a99888"/>
        </div>}
          {show && <div>
              <Link to={{
                pathname: "/myposts",
                state: {
                  user: token ? true : false
                }
              }}>
                <p className="sidebar-show-mobile">Menage your posts</p>
              </Link>
              <Link to={{
                pathname: "/mycomments"
              }}>
                <p className="sidebar-show-mobile">Manage your comments</p>
              </Link>
            </div>}
            
          

          </div>}
      
      </div>
      </div>
    
  </div>
}


export default Header;