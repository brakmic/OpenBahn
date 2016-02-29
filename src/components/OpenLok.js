import React, { Component } from 'react';
import bows from 'bows';

const log = bows('OpenLok');

export default class OpenLok extends Component {
  constructor(props){
    super(props);
    this.state = {
      service : props.service,
      location: '',
      data: 'no data'
    }
    this.search = this.search.bind(this);
    this.onLocationInput = this.onLocationInput.bind(this);
  }
  componentDidMount(){
    log(`[SERVICE] ${this.props.service.name} loaded`);
  }
  search(){
    let self = this;
    log(`[SEARCHING] ${this.state.location}`);
    this.state.service.getLocations(this.state.location)
                .then(r => r.json())
                .then(data => {
                  log(`[DATA] ${JSON.stringify(data, null, 4)}`);
                })
                .catch(err => log(JSON.stringify(err, null, 4)));
  }
  onLocationInput(e) {
    this.setState({
      location: e.target.value
    });
  }
  render(props) {
    return (
      <div className="panel panel-default">
       <div className="panel-heading">OpenLok</div>
        <div className="panel-body">
          Welcome to OpenLok!
          <img src="../../content/images/ICE3_small.png"></img>
        </div>
        <div className="input-group">
          <span className="input-group-btn">
            <button onClick={this.search} className="btn btn-default" type="button">Search</button>
          </span>
          <input onInput={this.onLocationInput} type="text" className="form-control" placeholder="Search for..."></input>
        </div>
        <div className="well" value={this.state.data}></div>
        <div className="panel-footer"></div>
      </div>
    );
  }
}