'use strict';

var expect = require('chai').expect
  , supertest = require('supertest')
  , cheerio = require('cheerio')
  , app = require('../index.js');

describe('voice route', function () {
  describe('POST /voice/', function () {
    it('responds with twiml', function (done) {
      var testApp = supertest(app);
      testApp
        .post('/voice/')
        .expect(200)
        .end(function (err, res) {
          var $ = cheerio.load(res.text);
          expect($('dial').length).to.equal(1);
          expect($('dial').attr().callerid).to.equal('my-twilio-number');
          done();
        });
    });
  });
});

describe('index route', function () {
  describe('GET /', function () {
    it('responds with 200', function (done) {
      var testApp = supertest(app);
      testApp
        .get('/')
        .expect(200, done);
    });
  });
});

describe('token route', function () {
  describe('GET /token', function () {
    it('responds with token', function (done) {
      var testApp = supertest(app);
      testApp
        .get('/token')
        .expect(200)
        .end(function(err, res) {
          const jsonResponse = JSON.parse(res.text);
          expect(jsonResponse.token.length).to.be.above(0);
          done();
        });
    });
  });
});
