import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {BrowserRouter, Route, browserHistory, Link} from "react-router-dom";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
    this.handleForm = this.handleForm.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleForm(e) {
    e.preventDefault();

    var registerData = {
      username: this.state.username,
      password: this.state.password
    };

    axios.post('/signup', registerData, {withCredentials: true})
      .then((res)=>{
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
    return (
      <div className="signup">
        <h2>Create a free account.</h2>
        <p>Have an account?<span> <Link to="/login" className="link">Log In</Link></span></p>
        <form onSubmit={this.handleForm} id="signUpForm">
          <input required type="text" id="username" name="username" placeholder="Username" onChange={this.handleUserChange}/><br/>
          <input required type="password" id="password" name="password" placeholder="Password" onChange={this.handlePasswordChange}/><br/>
          <input type="submit" id="signUpSubmit" value="Register"/>
        </form>
      </div>
    )
  }
};

export default Signup;