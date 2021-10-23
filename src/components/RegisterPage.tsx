import "../stylesheets/RegisterPage.css";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey, faEnvelope } from '@fortawesome/free-solid-svg-icons'

 const RegisterPage:React.FC = ()=> {

  const history = useHistory();
  
  const register = () => {

    console.log("registered")
    history.push('/');
  }


   return (
    <div className="register-container">
      <div className="register-window" >
        <p>Sign up</p>
        <div className="register-inputs">
          <label htmlFor="name">name</label>
          <span><FontAwesomeIcon icon={faUser} color="#654a86" /><input type="text" name="name" id="name" /></span>
          <label htmlFor="email">email</label>
          <span><FontAwesomeIcon icon={faEnvelope} color="#654a86" /><input placeholder="Email adress" type="text" name="email" id="email" /></span>
          <label htmlFor="passsword">password</label>
          <span><FontAwesomeIcon icon={faKey} color="#654a86" /><input placeholder="Password" type="password" name="password" id="password" /></span>
          <label htmlFor="repeatPassword">reapet password</label>
          <span><FontAwesomeIcon icon={faKey} color="#654a86" /><input type="text" name="repeatPassword" id="repeatPassword" /></span>
          <button className="button is-primary is-medium" onClick={()=>register()}>Sign up</button>
          
          
        </div>
        
      </div>

    </div>)
 }


 export default RegisterPage;