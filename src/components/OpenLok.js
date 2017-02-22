import React, { Component } from 'react';
import bows from 'bows';
import * as _ from 'lodash';
const cuid = require('cuid')
import moment from 'moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

const log = bows('OpenLok');

export default class OpenLok extends Component {
  constructor(props){
    super(props);
    this.state = {
      service : props.service,
      moment: moment(),
      location: '',
      data: {
        LocationList: {
          StopLocation: []
        }
      },
      dateFrom: new Date(),
      dateTo: null
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
                  self.setState({ data: data });
                  log(`[DATA] ${JSON.stringify(data, null, 4)}`);
                })
                .catch(err => log(JSON.stringify(err, null, 4)));
  }
  onLocationInput(e) {
    this.setState({
      location: e.target.value
    });
  }
  onDateChange(name, value){
    this.setState({
      ['date' + name]: value
    });
    log(`[CHANGE] ${name}: ${value}`);
  }
  render(props) {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="text-center h3">Welcome to OpenLok!</div>
        </div>
          <div className="panel-body">
            <div className="container">
              <div className="row">
                <div className="border col-xs-8">
                   <img src="../../content/images/ICE3_small.png"></img>
                </div>
                <div className="border col-xs-4">
                    <div className="block-padding">
                      <DateTimePicker
                        defaultValue={this.state.dateFrom}
                        onChange={this.onDateChange.bind(this, 'From')}
                      />
                    </div>
                    <div className="block-padding">
                      <DateTimePicker
                        defaultValue={this.state.dateTo}
                        onChange={this.onDateChange.bind(this, 'To')}
                      />
                    </div>
                    <div className="input-group">
                    <span className="input-group-btn">
                      <button onClick={this.search} className="btn btn-default" type="button">Search</button>
                    </span>
                    <input onInput={this.onLocationInput} type="text" className="form-control" placeholder="Search for City..."></input>
                  </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <ul className="list-group">
                  {
                    _.map(this.state.data.LocationList.StopLocation, loc => {
                           return (<a href="#" className="list-group-item" key={cuid()}>
                              <h4 className="list-group-item-heading" key={cuid()}>{loc.name}</h4>
                              <p className="list-group-item-text" key={cuid()}>Lat: {loc.lat} - Lon: {loc.lon}</p>
                           </a>)
                     })
                  };
                </ul>
              </div>   
          </div>

        <div className="panel-footer"></div>
      </div>
    );
  }
}