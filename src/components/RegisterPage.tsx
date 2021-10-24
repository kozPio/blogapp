import "../stylesheets/RegisterPage.css";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
  useMutation,
  gql
} from "@apollo/client";
import { useState, useEffect } from "react";
import NotificationModal from "./NotificationModal";
import checkInputs from "../utils/checkInputs";



const REGISTER = gql`
mutation($props: CreateUserInput!){
  createUser(
      data: $props
  ){
    token,
    user {
      name
    }
  }
}
`;


interface RegisterReturn {
  name: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}


interface ErrorProps {
  name: boolean,
  email: boolean,
  password: boolean
}

 const RegisterPage:React.FC = ()=> {

  const [name, setName]= useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const history = useHistory();
  const [inputErrors, setInputErrors] = useState<ErrorProps>({
    name: false,
    email: false,
    password: false
  });
  const [registerError, setRegisterError]=useState<Error | null>(null);


  const [register, { error, data }] = useMutation<
    { register: RegisterReturn }, 
    { props: RegisterData } 
  >(REGISTER, {
    variables: { props: { name, email, password } }, onError: (err) => {
      setRegisterError(err)} 
  });

  
  const signUp = () => {
    let result = checkInputs({password, email, repeatPassword, name});
    if('name' in result[1]){
      setInputErrors(result[1])
    }
    if(result[0]){
      register();
    }
    
  }


  const login = () => {
    history.push('/login');
  }

  const home = () => {
    history.push('/');
  }


  useEffect(()=> {
    if(data){
      history.push('/login');
    }
  },[data, history])

  if (error) return <p>{error.message}</p>;

   return (
    <div className="register-container">
      <div className="register-window" >
        <p>Sign up</p>
        <div className="register-inputs">
          <label htmlFor="name">name</label>
          <span><FontAwesomeIcon icon={faUser} color="#a99888" /><input value={name} onChange={(e)=> setName(e.target.value)} type="text" name="name" id="name" placeholder="Enter your name" /></span>
          {inputErrors.name && <p className="register-inputs-error">Name is too short</p>}
          <label htmlFor="email">email</label>
          <span><FontAwesomeIcon icon={faEnvelope} color="#a99888" /><input value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Email adress" type="email" name="email" id="email" /></span>
          {inputErrors.email && <p className="register-inputs-error">please enter email correctly</p>}
          <label htmlFor="passsword">password</label>
          <span><FontAwesomeIcon icon={faKey} color="#a99888" /><input value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Password" type="password" name="password" id="password" /></span>
          <label htmlFor="repeatPassword">reapet password</label>
          <span><FontAwesomeIcon icon={faKey} color="#a99888" /><input value={repeatPassword} onChange={(e)=> setRepeatPassword(e.target.value)} type="password" name="repeatPassword" id="repeatPassword"  placeholder="Repeat password"/></span>
          {inputErrors.password && <p className="register-inputs-error">passwords do not match or password is less than 8 chars</p>}
          <button className="button register-button is-medium" onClick={()=>signUp()}>Sign up</button>
          <div className="register-buttons">
            <p>Already have na account</p><div className="register-button-link" onClick={()=>login()}>Sgin In</div> 
          </div>
          <div className="register-button-link register-button-link-home" onClick={()=>home()}>Back to main page</div>
          
          
        </div>
        
      </div>
      {registerError && <NotificationModal modalContent={registerError.message} toggleModal={(err: Error | null)=> setRegisterError(err)}/>}
    </div>)
 }


 export default RegisterPage;