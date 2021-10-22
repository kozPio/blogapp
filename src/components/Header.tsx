import '../stylesheets/Header.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faRightFromBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Header:React.FC = ()=> {
  return <div className="header">
    <div className="header-logo-search">
     
      <div className="header-search">
        <FontAwesomeIcon className="header-magnifyingGlass" icon={faMagnifyingGlass} color="#a99888" /><input placeholder="find post" type="text" />
      </div>
    </div>
    
    <div className="header-sign">
      <span className="header-sign-button"><FontAwesomeIcon  icon={faRightFromBracket} color="#a99888" /> <p>Login</p></span>
      <span className="header-sign-button"><FontAwesomeIcon  icon={faUserPlus} color="#a99888" /> <p>Register</p></span>
    </div>
    
  </div>
}


export default Header;