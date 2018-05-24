import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import {BrowserRouter, Route, browserHistory, Link, Redirect} from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import NewPoll from "./NewPoll";
import PollInfo from "./PollInfo";
import MyPolls from "./MyPolls";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: false};
    this.getData = this.getData.bind(this);
  }

  getData(val) {
    this.setState({isLoggedIn: val});
  }
  
  render() {  
    return (
      <div id="container">
        <Navbar handleLogout={this.getData} isLoggedIn={this.state.isLoggedIn}/>
        <Route exact path="/" component={Home}/>
        <Route path="/home" component={Home}/>
        <Route path="/login" render={() => (this.state.isLoggedIn ? (<Redirect to="/home"/>) : (<Login handleLogin={this.getData}/>))}/>
        <Route path="/signup" render={() => (this.state.isLoggedIn ? (<Redirect to="/home"/>) : (<Signup handleLogin={this.getData}/>))}/>
        <Route path="/createpoll" render={() => (this.state.isLoggedIn ? (<NewPoll/>) : (<Redirect to="/home"/>))}/>
        <Route path="/poll/:id" component={PollInfo}/>
        <Route path="/mypolls" render={() => (this.state.isLoggedIn ? (<MyPolls/>) : (<Redirect to="/home"/>))}/>
      </div>
    );
  }
}

export default App;