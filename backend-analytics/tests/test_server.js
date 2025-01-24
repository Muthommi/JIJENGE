import request from 'supertest';
import app from '../server.js';
import mongoose from 'mongoose';
import chai from 'chai';

const expect = chai.expect;

const sampleUserId = new mongoose.Types.ObjectId();
const samplePeriod = '2023-12';

const SummarySchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  period: String,
  totalIncome: Number,
  totalExpenses: Number,
  savings: Number,
});
const Summary = mongoose.model('Summary', SummarySchema);

describe('Backend-Analytics Server Tests', function() {
  this.timeout(10000);

  before(async () => {
    await mongoose.connect('mongodb://localhost:27017/test_jijengeAnalytics', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should return status 200 for base route', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).to.equal(200);
  });

  it('should return analytics summary', async () => {
    await Summary.create({ userId: sampleUserId, period: samplePeriod, totalIncome: 1000, totalExpenses: 500, savings: 500 });
    
    const response = await request(app).get(`/api/analytics/summary/${sampleUserId}/${samplePeriod}`)
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.have.property('totalIncome').that.equals(1000);
    expect(response.body).to.have.property('totalExpenses').that.equals(500);
    expect(response.body).to.have.property('savings').that.equals(500);

    await Summary.deleteMany({});
  });

  it('should return 404 for non-existent summary', async () => {
    const response = await request(app).get(`/api/analytics/summary/${sampleUserId}/2020-01`);
    expect(response.statusCode).to.equal(404);
  });
});
