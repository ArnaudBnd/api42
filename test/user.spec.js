// Dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const Server = require('../app/server.js');

// Core
const server = new Server();
const app = server.app;
const should = chai.should();

chai.use(chaiHttp);

let userId = '';

/**
 * GET /user
 */
describe('GET /user', () => {

  it('POST /create should create an user', done => {
    const payload = {'name': 'jp','gender': 'male'};

    chai.request(app)
      .post('/user/create')
      .send(payload)
      .end((err, res) => {
          res.should.have.status(200)
          userId = res.body._id

          done();
      });
  });

  it('POST /create should check the payload body is false', done => {
    const payload = {'nme': 'tutu','ag': 40,'gende': 'male'};

    chai.request(app)
      .post('/user/create')
      .send(payload)
      .end((err, res) => {
          res.should.have.status(400);

          done();
      });
  });

  it('GET /show:id should not get an user by false id', done => {
    chai.request(app)
      .get(`/user/show/${userId}`)
      .end((err, res) => {
          res.should.have.status(200);

          done();
      });
  });

  it('GET /show:id should have not id in url', done => {
    chai.request(app)
      .get('/user/show/')
      .end((err, res) => {
          res.should.have.status(404);
          res.text.should.be.eql('{"code":404,"message":"Not Found"}');

          done();
      });
  });

  it('GET /show:id should get an user result with id 5b1fcd4ab3b7a752e07ec415', done => {
    chai.request(app)
      .get('/user/show/5b1fcd4ab3b7a752e07ec415')
      .end((err, res) => {
          res.should.have.status(200);

          done();
      });
  });

  it('GET /search should search user ', done => {
    const payload = {'id': userId};

    chai.request(app)
      .get('/user/search/jp')
      .end((err, res) => {
          res.should.have.status(200);
          //console.log(res.body.data.length)

          done();
      });
  });

  it('PUT /update should update user', done => {
    const payload = {"name":"thomas","gender":"femal"};

    chai.request(app)
      .put(`/user/update/${userId}`)
      .send(payload)
      .end((err, res) => {
          res.should.have.status(200);

          done();
      });
  });

  it('DELETE /destroy/:id should delete an user', done => {

    chai.request(app)
      .delete(`/user/destroy/${userId}`)
      .end((err, res) => {
          res.should.have.status(200);

          done();
      });
  });

  it('DELETE /destroy/:id should have not id in url', done => {
    chai.request(app)
      .get('/user/destroy/')
      .end((err, res) => {
          res.should.have.status(404);
          res.text.should.be.eql('{"code":404,"message":"Not Found"}');

          done();
      });
  });
});