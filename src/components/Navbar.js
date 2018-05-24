import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {BrowserRouter, Route, browserHistory, Link} from "react-router-dom";
import NavbarLoggedOut from "./NavbarLoggedOut";
import NavbarLoggedIn from "./NavbarLoggedIn";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }

  //post because don't want this to happen if you just type it in URL
  logOut(e) {
    e.preventDefault();
    
    axios.get('/logout', {withCredentials: true})
      .then((res)=>{
        this.props.handleLogout(res.data);
      });
  }

  render() {
    return (this.props.isLoggedIn ? <NavbarLoggedIn handleLogout={this.logOut}/> : <NavbarLoggedOut/>)
  }
}

export default Navbar;