import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {BrowserRouter, Route, browserHistory, Link} from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
    this.handleForm = this.handleForm.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleForm(e) {
    //this is needed to prevent submit click to actually submit form...or some reason
    e.preventDefault();

    var loginData = {
      username: this.state.username,
      password: this.state.password
    };

    axios.post('/login', loginData, {withCredentials: true})
      .then((res)=>{

        if (res.data === 'Incorrect Password') {
          document.getElementById('message').innerHTML = res.data;
          return;
        }

        if (res.data === 'No Username Found') {
          document.getElementById('message').innerHTML = res.data;
          return;
        }

        this.props.handleLogin(res.data);
        console.log(res.data);

      });

  }

  handleUserChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  render() {
    return(
      <div className="login">
        <h2>Login</h2>
        <p>Don't have an account?<span> <Link to="/signup" className="link">Sign Up</Link></span></p>
        <form onSubmit={this.handleForm} id="logInForm">
          <input required type="text" id="username" placeholder="Username" onChange={this.handleUserChange}/><br/>
          <input required type="password" id="password" placeholder="Password" onChange={this.handlePasswordChange}/><br/>
          <input type="submit" id="logInSubmit" value="Login"/>
          <p id="message"></p>
        </form>
      </div>
    ) 
  }
};  

export default Login;