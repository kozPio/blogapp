import '../stylesheets/Header.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faRightFromBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Header:React.FC = ()=> {

  const token = localStorage.getItem('token');

  return <div className="header">
    <div className="header-logo-search">
     
      <div className="header-search">
        <FontAwesomeIcon className="header-magnifyingGlass" icon={faMagnifyingGlass} color="#a99888" /><input placeholder="find post" type="text" />
      </div>
    </div>
    {token ? <div className="header-sign">
      <span className="header-sign-button"><FontAwesomeIcon  icon={faRightFromBracket} color="#a99888" /> <p>Logout</p></span>
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