import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, browserHistory, Link} from "react-router-dom";

class NavbarLoggedIn extends React.Component {

  render() {
    return (
      <div className="navbar navbar-light bg-light">
        <ul>
          <li id="home"><Link to="/home"><i className="fa fa-home"></i> Home</Link></li>
        </ul>
        <ul className="ml-auto">
          <li id="createpoll"><Link to="/createpoll"><i className="fa fa-pencil"></i> Create Poll</Link></li>
          <li id="mypolls"><Link to="/mypolls"><i className="fa fa-user"></i> My Polls</Link></li>
          <li id="logout"><Link to="/home" onClick={this.props.handleLogout}><i className="fa fa-sign-out"></i> Log Out</Link></li>
        </ul>
      </div>
    )
  }
}

export default NavbarLoggedIn;