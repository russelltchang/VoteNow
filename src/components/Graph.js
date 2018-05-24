import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {Bar, Line, Pie} from 'react-chartjs-2';

class Graph extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="chart">
        <Pie data={this.props.chartData}/>
      </div>
    ) 
  }
};  

export default Graph;