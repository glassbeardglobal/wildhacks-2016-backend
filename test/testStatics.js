var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe('Static Pages', function() {
  it('should return page on / GET', function(done) {
    chai.request(server)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it('should return interface on /api GET', function(done) {
    chai.request(server)
      .get('/api')
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
  });
});
