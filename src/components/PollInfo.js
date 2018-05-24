import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Graph from "./Graph";
import {Bar, Line, Pie} from 'react-chartjs-2';

class PollInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '', 
      options: [""], 
      count: [""], 
      currentOption: '',
    };
    this.addVote = this.addVote.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  componentDidMount() {
    var pollId = this.props.match.params.id;

    axios.get('/poll/'+pollId, {withCredentials: true})
      .then(res=>{
        this.setState({
          title: res.data[0].title, 
          options: res.data[0].options, 
          count: res.data[0].count, 
          currentOption: res.data[0].options[0], 
          currentOptionIndex: 0,
          chartData: {
            labels: res.data[0].options, 
            datasets: [{
              label:'Count', 
              data: res.data[0].count, 
              backgroundColor: ['orange', 'lightgreen', 'lightblue', 'purple', 'lavender', 'tan'],
              borderWidth: 0
          }]}
        });
      });
  }

  handleOptionChange(e) {
    var optionsArray = this.state.options.slice();
    var index = optionsArray.indexOf(e.target.value);
    this.setState({currentOption: e.target.value, currentOptionIndex: index});
  }

  addVote(e) {
    e.preventDefault();
    
    var voteInfo = {
      vote: this.state.currentOption,
      title: this.state.title,
      index: this.state.currentOptionIndex,
    }

    axios.post('/addvote', voteInfo, {withCredentials: true})
      .then((res)=>{
        this.setState({
          count: res.data[0].count,
          chartData: {
            labels: res.data[0].options, 
            datasets: [{
              label:'Count', 
              data: res.data[0].count,
            }]
          }
        });
      });
  }

  render() {
    var title = this.state.title.slice();
    var options = this.state.options.slice();
    var list = options.map((option) => <option>{option}</option>);

    return(
      <div id="pollInfo">
        <form id="addVoteForm" onSubmit={this.addVote}>
          <h2>{title}</h2>
          <div class="form-group">
            <select className="form-control" onChange={this.handleOptionChange}>{list}</select>
          </div>
          <input id="voteButton" type="submit" value="Vote"/>
        </form>
        <Graph chartData={this.state.chartData}/>
      </div>
    )
  }
};

export default PollInfo;