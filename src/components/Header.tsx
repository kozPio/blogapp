import '../stylesheets/Header.css';

const Header:React.FC = ()=> {
  return <div className="header">
    <div>
      <p>Logo</p>
    </div>
    <div>
      <p>SearchBar</p>
    </div>
    <div className="header-sign">
      <p>Login</p>
      <p>register</p>
    </div>
    
  </div>
}


export default Header;