//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
var express = require('express');
var app = express();
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server.js');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('api', () => {
    /*
     * Test the /GET route
     */
    describe('/GET book', () => {
        it('it should GET all the books', (done) => {
          chai.request(server)
              .get('/api/login')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  //res.body.length.should.be.eql(1);
                done();
              });
        });
    });
    
});