import "../stylesheets/LoginPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  useMutation,
  gql
} from "@apollo/client";


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
  

 const LoginPage:React.FC = ()=> {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const [login, { error, data }] = useMutation<
    { login: LoginToken }, // sets what is returned from this mutation what props can I access on data after mutation (if those props exist)
    { data: LoginData } // Seting variable data to implement interface LoginData
  >(LOG_IN, {
    variables: { data: { email, password } } // Variables are implementing interface of LOginData
  });

  useEffect(()=> {
    if(data){
      localStorage.setItem("token", data.login.token)
      history.push('/')
    }
  },[data])


  

  // const login = () => {
  //   console.log(password)
  //   console.log(email)
  // }

  const register = () => {
    history.push('/register')
  }


   return (
    <div className="login-container">
      <div className="login-window" >
        <p>Log in to your account</p>
        <div className="login-inputs">
          <label htmlFor="email">email</label>
          <span><FontAwesomeIcon icon={faUser} color="#654a86" /><input value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Email adress" type="text" name="email" id="email" /></span>
          <label htmlFor="passsword">password</label>
          <span><FontAwesomeIcon icon={faKey} color="#654a86" /><input value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Password" type="password" name="password" id="password" /></span>
          <button className="button is-primary is-medium" onClick={() => email && password && login()}>Log In</button>
          
          
        </div>
        <div className="login-buttons">
          <span onClick={()=>register()}>Register</span>
        </div>
        
      </div>

    </div>)
 }


 export default LoginPage;