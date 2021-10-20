import "../stylesheets/LoginPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router-dom";

 const LoginPage:React.FC = ()=> {

  const history = useHistory();

  const login = () => {
    console.log("loged in")
  }

  const register = () => {
    history.push('/register')
    console.log("registered")
  }


   return (
    <div className="login-container">
      <div className="login-window" >
        <p>Log in to your account</p>
        <div className="login-inputs">
          {/* <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" /> */}
          <label htmlFor="email">email</label>
          <span><FontAwesomeIcon icon={faUser} color="#654a86" /><input placeholder="Email adress" type="text" name="email" id="email" /></span>
          <label htmlFor="passsword">password</label>
          <span><FontAwesomeIcon icon={faKey} color="#654a86" /><input placeholder="Password" type="password" name="password" id="password" /></span>
          
          {/* <label htmlFor="repeatPassword">Reapet Password</label>
          <input type="text" name="repeatPassword" id="repeatPassword" /> */}
          <button className="button is-primary is-medium" onClick={()=>login}>Log In</button>
          
          
        </div>
        <div className="login-buttons">
          <span onClick={()=>register()}>Register</span>
        </div>
        
      </div>

    </div>)
 }


 export default LoginPage;