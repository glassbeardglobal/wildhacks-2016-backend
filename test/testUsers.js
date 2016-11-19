var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

var uid;

describe('Users', function() {
  it('should get all users on / GET', function(done) {
    chai.request(server)
      .get('/api/users')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });

  it('should create a user on / POST', function(done) {
    chai.request(server)
      .post('/api/users')
      .send({
        'name': 'Korndawg Shram',
        'email': 'kscharm1@bsd220.org',
        'password': 'foobar'
      }).end(function(err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        res.body.success.should.equal(true);
        res.body.should.have.property('user');
        res.body.user.should.have.property('_id');
        uid = res.body.user._id;
        done();
      });
  });

  it('should delete user on /:id DELETE', function(done) {
    chai.request(server)
      .delete('/api/users/' + uid)
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.should.have.property('success');
        res.body.success.should.equal(true);
        done();
      });
  });
});
