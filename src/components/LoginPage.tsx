import "../stylesheets/LoginPage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  useMutation,
  gql
} from "@apollo/client";
import NotificationModal from './NotificationModal';
import checkInputs from "../utils/checkInputs";


const LOG_IN = gql`
    mutation($data:LoginUserInput!) {
      login (
        data: $data
      ) {
        token
      }
    }
  `;


interface LoginToken {
  token: string;
}


interface LoginData {
  email: string;
  password: string;
}

interface ErrorProps {
  email: boolean,
  password: boolean
}
  

 const LoginPage:React.FC = ()=> {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError]=useState<Error | null>(null);
  const [inputErrors, setInputErrors] = useState<ErrorProps>({
    email: false,
    password: false
  })

  const history = useHistory();

  const handleLogin = () => {
    let result = checkInputs({password, email});
    setInputErrors(result[1])
    if(result[0]){
      login();
    }
  }

  

  const [login, { data}] = useMutation<
    { login: LoginToken }, // sets what is returned from this mutation what props can I access on data after mutation (if those props exist)
    { data: LoginData } // Seting variable data to implement interface LoginData
  >(LOG_IN, {
    variables: { data: { email, password }  },  onError: (err) => {
      setLoginError(err);
  }  // Variables are implementing interface of LOginData
  });

  useEffect(()=> {
    if(data){
        localStorage.setItem("token", data.login.token)
        history.push('/')
    }
  },[data])


  const register = () => {
    history.push('/register')
  }

  const home = () => {
    history.push('/');
  }




   return (
    <div className="login-container">
      <div className="login-window" >
        <p>Log in to your account</p>
        <div className="login-inputs">
          <label htmlFor="email">email</label>
          <span><FontAwesomeIcon icon={faUser} color="#a99888" /><input value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Email adress" type="text" name="email" id="email" /></span>
          {inputErrors.email && <p className="register-inputs-error">plese enter email correctly</p>}
          <label htmlFor="passsword">password</label>
          <span><FontAwesomeIcon icon={faKey} color="#a99888" /><input value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Password" type="password" name="password" id="password" /></span>
          {inputErrors.password && <p className="register-inputs-error">password is less than 8 chars</p>}
          <button className="button is-medium login-button" onClick={() => handleLogin()}>Log In</button>
          
          
        </div>
        <div className="login-buttons">
          <span onClick={()=>register()}>Register</span>
          <span onClick={()=>home()}>Back to main page</span>
        </div>
        {loginError && <NotificationModal modalContent={loginError.message} toggleModal={(err: Error | null)=> setLoginError(err)}/>}
      </div>
    </div>)
 }


 export default LoginPage;