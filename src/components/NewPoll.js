import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {BrowserRouter, Route, browserHistory, Link, Redirect} from "react-router-dom";

class NewPoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {title : '', options: ["","",""], count: [0,0,0], redirect: false};
    this.addPoll = this.addPoll.bind(this);
    this.addOption = this.addOption.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  handleOptionChange(e) {
    var optionsCopy = this.state.options.slice();
    var id = e.target.id-1;
    optionsCopy[id] = e.target.value;
    this.setState({options: optionsCopy});
  }

  handleTitleChange(e) {
    this.setState({title: e.target.value});
  }

  addOption() {
    var optionsLength = this.state.options.length;
    if (optionsLength <= 5) {
      var optionsArray = this.state.options.slice();
      optionsArray.push(<div><input id={(optionsLength+1)} onChange={this.handleOptionChange} placeholder={'Choice #'+(optionsLength+1)}/></div>);
      var countArray = this.state.count.slice();
      countArray.push(0);
      this.setState({options: optionsArray, count: countArray});
    }
  }

  addPoll(e) {
    e.preventDefault();

    var options = this.state.options.slice();
    var optionValues = [];
    options.forEach((option, i)=>{
      return optionValues.push(document.getElementById(i+1).value);
    });

    function checkIfArrayIsUnique(myArray) {
      return myArray.length === new Set(myArray).size;
    };

    if (!checkIfArrayIsUnique(optionValues)) {
      return;
    };

    var pollData = {
      title: this.state.title,
      options: this.state.options,
      count: this.state.count
    };
    
    axios.post('/createpoll', pollData, {withCredentials: true})
      .then((res)=>{
        this.setState({redirect: res.data});
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/home"/>
    }

    var optionsCopy = this.state.options.slice();
    var options = optionsCopy.map((option, i)=>
      <div>
        <input required className="option" id={i+1} onChange={this.handleOptionChange} maxlength="50" placeholder={"Option #"+(i+1)}/>
      </div>
    );

    return(
      <div id="newpoll">
        <form id="newPollForm" onSubmit={this.addPoll}>
          <h2>Create poll</h2>
          <h6>Options must be unique</h6>
          <input required id="title" maxlength="30" placeholder="Title" name="title" onChange={this.handleTitleChange}/>
          {options}
          <input id="newOption" type="button" value="Add Option" onClick={this.addOption}/>
          <input id="newPollSubmit" type="submit" value="Create"/>
        </form>
      </div>
    )
  }
};

export default NewPoll;