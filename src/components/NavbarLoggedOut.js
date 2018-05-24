import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, browserHistory, Link} from "react-router-dom";

class NavbarLoggedOut extends React.Component {
  render() {
    return (
      <div className="navbar navbar-light bg-light">
        <ul>
          <li id="home"><Link to="/home"><i className="fa fa-home"></i> Home</Link></li>
        </ul>
        <ul className="ml-auto">  
          <li id="login"><Link to="/login"><i className="fa fa-sign-in"></i> Login</Link></li>
          <li id="signup"><Link to="/signup"><i className="fa fa-user-plus"></i> Register</Link></li>
        </ul>
      </div>
    )
  }
}

export default NavbarLoggedOut;