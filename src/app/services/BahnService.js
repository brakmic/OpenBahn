const log         = require('bows')('BahnService');
let   baseUrl     = 'http://open-api.bahn.de/bin/rest.exe/';
const locationApi = 'location.name';
const authKey     = 'YOUR_API_HERE';
const input       = 'input';
const format      = 'format=json';
const settings    = 'lang=de';

export default class BahnService {
  constructor(props){
    if(props){
      this.useLocalApi = props.useLocalApi;
      if(this.useLocalApi){
        baseUrl = props.apiServer ? props.apiServer : 'http://localhost:3000/';
      }
    }
    this.settings     = null;
    this.postSettings = null;
    this.name         = 'BahnService';
    this.init();
  }
  init(){
    this.settings = {
    method: 'GET',
    //mode: 'no-cors',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
      },
    };
    this.postSettings = {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
      },
    };
  }
  getLocations(query){
    let serviceUrl = null;
    if(!this.useLocalApi) {
      serviceUrl = `${baseUrl}${locationApi}?authKey=${authKey}&${settings}&${input}=${query}&${format}`;
    }else{
      serviceUrl = `${baseUrl}locations/${query}`;
    }
    log(`[GET LOCATIONS] ${serviceUrl}`);
    /*return this.executeFetch(serviceUrl)
                .then(r => r.json())
                .then(data => console.log(`[DATA] ${data}`))
                .catch(err => console.log(JSON.stringify(err, null, 4)));*/
    return this.executeFetch(serviceUrl);
  }
  executeFetch(serviceQuery, settings = this.settings){
    return fetch(serviceQuery);
  }
}
