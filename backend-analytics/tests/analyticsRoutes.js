import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { expect } from 'chai';
import Summary from '../models/Summary.js';
import CategoryAnalytics from '../models/CategoryAnalytics.js';
import Trend from '../models/Trend.js';
import analyticsRoutes from '../routes/analyticsRoutes.js';

const app = express();
app.use(express.json());
app.use('/analytics', analyticsRoutes);

describe('Analytics Routes', function() {
  this.timeout(10000);

  before(async function() {
    try {
      await mongoose.connect('mongodb://localhost:27017/test_database');
    } catch (error) {
      console.error('Error connecting to test database:', error);
      throw error;
    }
  });

  after(async function() {
    try {
      await mongoose.connection.db.dropDatabase();
      await mongoose.connection.close();
    } catch (error) {
      console.error('Error cleaning up database:', error);
      throw error;
    }
  });

  beforeEach(async function() {
    try {
      await Promise.all([
        Summary.deleteMany({}),
        CategoryAnalytics.deleteMany({}),
        Trend.deleteMany({})
      ]);
    } catch (error) {
      console.error('Error clearing collections:', error);
      throw error;
    }
  });

  it('should return summary data', async function() {
    const userId = new mongoose.Types.ObjectId().toString();
    const period = '2023-12';
    await Summary.create({
      userId,
      period,
      totalIncome: 5000,
      savings: 2000
    });
    const response = await request(app).get(`/analytics/summary/${userId}/${period}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('totalIncome').that.is.a('number');
    expect(response.body).to.have.property('totalExpenses').that.is.a('number');
    expect(response.body).to.have.property('savings').that.is.a('number');
    expect(response.body).to.have.property('period').that.is.a('string');
  });

  it('should return category analytics', async function() {
    const userId = new mongoose.Types.ObjectId();
    const analyticsData = { userId: new mongoose.Types.ObjectId(), category: 'Food', period: '2022', totalExpense: 100 };
    await CategoryAnalytics.create(analyticsData);
    const response = await request(app)
      .get(`/analytics/category/${analyticsData.userId}/${analyticsData.period}`)
      .expect(200);

      expect(response.body[0].data).to.equal(analyticsData.data);
  });

  it('should return trends data', async function() {
    const userId = new mongoose.Types.ObjectId();
    const trendData = { userId: new mongoose.Types.ObjectId(), type: 'expense', amount: 100, date: new Date(), };
    await Trend.create(trendData);
    const response = await request(app)
      .get(`/analytics/trends/${trendData.userId}`)
      .expect(200);
    expect(response.body[0].data).to.equal(trendData.data);
  });
});
