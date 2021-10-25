import '../stylesheets/Header.scss';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faRightFromBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';




const Header:React.FC = ()=> {
  
  const [searchFraze, setSearchFraze]= useState('')
  const token = localStorage.getItem('token');
  const history = useHistory();
  

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
        <button onClick={()=> search()}>Search</button>
      </div>
    </div>
    {token ? <div className="header-sign">
      <span onClick={() => logout()} className="header-sign-button"><FontAwesomeIcon  icon={faRightFromBracket} color="#a99888" /> <p>Logout</p></span>
    </div> : <div className="header-sign">
      <Link to="/login">
        <span className="header-sign-button"><FontAwesomeIcon  icon={faRightFromBracket} color="#a99888" /> <p>Login</p></span>
      </Link>
      <Link to="/register">
        <span className="header-sign-button"><FontAwesomeIcon  icon={faUserPlus} color="#a99888" /> <p>Register</p></span>
      </Link>
      
    </div>}
    
    
  </div>
}


export default Header;