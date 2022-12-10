import './App.css';
import DataService from './services/DataService';

export default class Login {
  
  constructor() {
    this.username = '';
    this.password = '';
  }

  onLogin(e) {
    e.preventDefault();
    
    this.username = e.target.uname.value;
    this.password = e.target.psw.value;
    
    let loginObj = {
      "username" : this.username,
      "password" : this.password
    };

    const dataService = new DataService();
    const fetchUser = () => {
      dataService
        .postlogin(loginObj)
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    };
  }

  return() {
    <div className="App">
      <header className="App-header">
        <h1>Password Manager</h1>
        <form onSubmit={this.onLogin}>

          <div className="container">
            <label htmlFor="uname"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="uname" required/>
            <br/>
            <label htmlFor="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" required/>
            <br/>
            <button type="submit" className="button">Login</button>
            <br/>
            {/* <label>
              <input type="checkbox" checked="checked" onChange={handleRememberMe} name="remember"/> Remember me
            </label> */}
          </div>

          {/* <div class="container">
            <button type="button" class="cancelbtn">Cancel</button>
            <span class="psw">Forgot password?</span>
          </div> */}
        </form>
      </header>
    </div>
  
  }
  
}
