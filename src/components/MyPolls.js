import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {BrowserRouter, Route, browserHistory, Link} from "react-router-dom";
  
class MyPolls extends React.Component {
  constructor() {
    super();
    this.state = {polls: []};
  }

  componentDidMount() {
    axios.get('/mypolls', {withCredentials: true})
      .then(res=>{
        res.data.forEach((poll, i) => {
          var polls = this.state.polls.slice();
          polls.push([res.data[i].title, res.data[i].options, res.data[i]._id]);
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
          <p className="view btn btn-primary">
            <Link to={'/poll/'+poll[2]}>
              <i className="fa fa-line-chart"> View</i>
            </Link>
          </p>
        </div>
      </div>
    );

    return (
        <div>
          <div>{list}</div>
          <footer>Coded by Russell Chang © 2018</footer>
        </div>
    )
  }
}

export default MyPolls;