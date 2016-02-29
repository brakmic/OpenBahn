import React from 'react';
import ReactDOM from 'react-dom';
import OpenLok from './OpenLok';
import BahnService from './services/BahnService';
import 'bootstrap.min.css';
import 'bootstrap.theme.min.css';
import 'metisMenu.min.css';
import 'font-awesome.min.css';
import 'awesome-bootstrap-checkbox.css';

const bahnService = new BahnService({
                                      useLocalApi: true,
                                      apiServer: 'http://localhost:3000/'
                                    });

ReactDOM.render(<OpenLok service={bahnService} />, document.getElementById('app'));