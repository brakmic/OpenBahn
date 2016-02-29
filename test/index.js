import 'babel-polyfill';

let expect = require('chai').expect;
let Promise = require('es6-promise').Promise;

import config from './settings';
import BahnService from '../src/services/BahnService.js';

describe('BahnService', function() {

    it('is callable', function() {
        expect(BahnService).to.be.a('function');
    });

    it('initializes with default values', function(){
        expect(function(){
            new BahnService();
        }).not.to.throw();
    });
    it('initializes with local API-server set', function(){
        expect(function(){
            new BahnService({
                useLocalApi: true,
                apiServer: 'http://localhost:3000/'
            });
        }).not.to.throw();
    });
    it('initializes with remote API-Server set', function(){
        expect(function(){
            new BahnService({
                useLocalApi: false,
            });
        }).not.to.throw();
    });
});