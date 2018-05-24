import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {BrowserRouter, Route, browserHistory, Link} from "react-router-dom";
  
class Home extends React.Component {
  constructor() {
    super();
    this.state = {polls: []};
  }

  componentDidMount() {
    axios.get('/polls', {withCredentials: true})
      .then(res=>{
        res.data.forEach((poll, i) => {
          var polls = this.state.polls.slice();
          polls.push([res.data[i].title, res.data[i].options, res.data[i]._id, res.data[i].username]);
          this.setState({polls: polls});
        })
      });
  }

  render() {
    var polls = this.state.polls.slice();
    var list = polls.map((poll) => 
      <div className="card">
        <div className="card-block">
          <h1 className="pollName">{poll[0]}</h1>
          <p className="view btn btn-primary"><Link to={'/poll/'+poll[2]}>
            <i className="fa fa-pie-chart"> Vote</i></Link>
          </p>
        </div>
        <div className="card-footer">Created by {poll[3]}</div>
      </div>
    );

    return (
      <div>
        <div id="header">
          <h1>VoteNow</h1>
          <h4 id="description">VoteNow allows users to create and vote on polls, and view results in real-time. Built with React, Express, Node.js, and MongoDB, as well as React-Router, Bootstrap, and Chart.js.</h4>
        </div>
        <div>{list}</div>
        <footer>Russell Chang © 2018</footer>
      </div>
    )
  }
}

export default Home;