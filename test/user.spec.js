// Dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const Server = require('../app/server.js');

// Core
const server = new Server();
const app = server.app;
const should = chai.should();

chai.use(chaiHttp);

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
          res.should.have.status(200);

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
      .get('/user/show/5b1fcd4ab3b7a752e07ec415')
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

  it('POST /search should search user 1 and 2', done => {
    const payload = {'ids': ['1', '3']};

    chai.request(app)
      .post('/user/search')
      .send(payload)
      .end((err, res) => {
          res.should.have.status(200);

          done();
      });
  });

  it('POST /search should check the payload body is false', done => {
    const result = '{"errors":[{"parameter":"id","value":["1","3"],"message":"Unexpected value."},{"parameter":"ids","message":"Required value."}]}';
    const payload = {'id': ['1', '3']};

    chai.request(app)
      .post('/user/search')
      .send(payload)
      .end((err, res) => {
          res.should.have.status(400);
          res.text.should.be.eql(result);

          done();
      });
  });


  it('PUT /update should update user', done => {
    const payload = {"name":"thomas","gender":"femal"};

    chai.request(app)
      .put('/user/update/5b20b885da7ca15a8fd6d65e')
      .send(payload)
      .end((err, res) => {
          res.should.have.status(200);

          done();
      });
  });

  it('DELETE /destroy/:id should delete an user', done => {

    chai.request(app)
      .delete('/user/destroy/5b213033cfaa876b142c66a5')
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