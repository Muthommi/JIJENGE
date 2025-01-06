const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const should = chai.should();

chai.use('Analytics Routes', () => {
  it('should GET summary data for a user', (done) => {
    chai.request(app)
    .get('api/analytics/summary/60c72b2f9b1d8c001ce9f1e5/2025-01')
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('totalIncome');
      res.body.sould.have.property('totalExpenses');
      done();
    });
  });

  it('should GET category analytics for a user', (done) => {
    chai.request(app)
      .get('/api/analytics/category/60c72b2f9b1d8c001ce9f1e5/2025-01')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
});
