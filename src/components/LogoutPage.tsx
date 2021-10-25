import "../stylesheets/Logoutpage.scss";
import { useHistory } from "react-router";

 const LogoutPage:React.FC = ()=> {


  const history = useHistory();


  const login = () => {
    history.push('/login')
  }

  const home = () => {
    history.push({
      pathname: '/',
      state: { user: false }
    });
  }


 
   return (
    <div className="logout-container ">
      <div className="logout-window" >
        <p className="logout-message">You have been successfully logout</p>
        <div className="logout-inputs">
          <p>Login again</p>
          <button className="button is-medium logout-button" onClick={() => login()}>Log In</button>
        </div>
        <div className="logout-buttons">
          <p>or</p>
          <span onClick={()=>home()}>Back to main page</span>
        </div>
      </div>
    </div>)
 }


 export default LogoutPage;