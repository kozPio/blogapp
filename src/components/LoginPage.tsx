import "../stylesheets/LoginPage.css"
 
 const LoginPage:React.FC = ()=> {

  const login = () => {
    console.log("loged in")
  }

  const register = () => {
    console.log("registered")
  }


   return (
    <div className="login-container">
      <div className="login-window" >
        <h2>Login</h2>
        <div className="login-inputs">
          {/* <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" /> */}
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" />
          <label htmlFor="passsword">Password</label>
          <input type="text" name="password" id="password" />
          {/* <label htmlFor="repeatPassword">Reapet Password</label>
          <input type="text" name="repeatPassword" id="repeatPassword" /> */}

          
        </div>
        <div className="login-buttons">
          <button onClick={()=>login}>Login</button>
          <button onClick={()=>register}>Register</button>
        </div>
        
      </div>

    </div>)
 }


 export default LoginPage;